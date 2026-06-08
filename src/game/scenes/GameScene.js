import Player from '../objects/Player.js';
import Pet from '../objects/Pet.js';
import Chest from '../objects/Chest.js';
import Door from '../objects/Door.js';
import Bridge from '../objects/Bridge.js';
import Enemy from '../objects/Enemy.js';
import Boss from '../objects/Boss.js';
import NPC from '../objects/NPC.js';
import Hud from '../ui/Hud.js';
import SpeechPanel from '../ui/SpeechPanel.js';
import SpeechSystem from '../systems/SpeechSystem.js';
import ScoreSystem from '../systems/ScoreSystem.js';
import AudioSystem from '../systems/AudioSystem.js';
import { worlds } from '../data/worlds.js';
import { words } from '../data/words.js';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    init(data) {
        this.worldIndex = data.worldIndex || 0;
        this.worldData = worlds[this.worldIndex];
        this.speechSystem = new SpeechSystem();
        this.scoreSystem = new ScoreSystem();
        this.audioSystem = new AudioSystem(this);
    }

    create() {
        const { width, height } = this.scale;
        const worldWidth = 3000;

        // Ground
        this.platforms = this.physics.add.staticGroup();
        for (let x = 0; x < worldWidth; x += 32) {
            this.platforms.create(x, 584, 'ground');
        }

        // Player & Pet
        this.player = new Player(this, 100, 500);
        this.pet = new Pet(this, 80, 480);
        this.pet.setTarget(this.player);

        // Groups for interactions
        this.interactables = this.physics.add.staticGroup();
        this.enemies = this.physics.add.group();
        this.bosses = this.physics.add.staticGroup();

        this.setupWorldContent();

        // Colliders
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.overlap(this.player, this.interactables, this.handleInteraction, null, this);
        this.physics.add.overlap(this.player, this.enemies, this.handleInteraction, null, this);
        this.physics.add.overlap(this.player, this.bosses, this.handleInteraction, null, this);

        // UI
        this.hud = new Hud(this);
        this.speechPanel = new SpeechPanel(this);
        this.speechPanel.micIcon.setInteractive().on('pointerdown', () => this.startListening());

        // Camera
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, worldWidth, 600);

        this.cursors = {
            ...this.input.keyboard.createCursorKeys(),
            ...this.input.keyboard.addKeys('A,D,W,S')
        };

        this.currentInteractable = null;

        // Win condition trigger
        this.winTrigger = this.add.rectangle(worldWidth - 50, 300, 50, 600, 0x00ff00, 0);
        this.physics.add.existing(this.winTrigger, true);
        this.physics.add.overlap(this.player, this.winTrigger, () => {
            this.scene.start('ResultScene', { stats: this.scoreSystem.getStats() });
        });
    }

    setupWorldContent() {
        // Simple procedural-like placement based on world
        const worldWords = this.getWorldWords();

        // NPC at the start
        const welcomeNPC = new NPC(this, 300, 536, 'echo', 'welcome');
        this.interactables.add(welcomeNPC);
        welcomeNPC.word = { en: 'Hello', es: 'Hola' }; // Simple interaction

        // Chest
        this.interactables.add(new Chest(this, 600, 568, worldWords[0]));

        // Bridge
        const bridge = new Bridge(this, 1000, 500, words.general.find(w => w.id === 'bridge'));
        this.interactables.add(bridge);

        // Enemy
        const enemy = new Enemy(this, 1500, 568, words.general.find(w => w.id === 'sleep'));
        this.enemies.add(enemy);

        // Door
        this.interactables.add(new Door(this, 2000, 552, words.general.find(w => w.id === 'open')));

        // Boss (only in School Kingdom for MVP)
        if (this.worldData.id === 'school') {
            const bossWords = [
                words.school.find(w => w.id === 'teacher'),
                words.school.find(w => w.id === 'computer'),
                words.school.find(w => w.id === 'classroom')
            ];
            const boss = new Boss(this, 2600, 536, 'The Silent Shadow', bossWords);
            this.bosses.add(boss);
        }
    }

    getWorldWords() {
        switch(this.worldData.id) {
            case 'school': return words.school;
            case 'food': return words.food;
            case 'animal': return words.animal;
            default: return words.school;
        }
    }

    update() {
        this.player.update(this.cursors);
        this.pet.update();

        if (this.currentInteractable && Phaser.Math.Distance.Between(this.player.x, this.player.y, this.currentInteractable.x, this.currentInteractable.y) > 150) {
            this.speechPanel.hide();
            this.currentInteractable = null;
            this.player.isSpeaking = false;
        }
    }

    handleInteraction(player, object) {
        if (this.currentInteractable === object) return;

        if (object instanceof Chest && object.isOpened) return;
        if (object instanceof Door && object.isOpen) return;
        if (object instanceof Bridge && object.isActivated) return;
        if (object instanceof Enemy && object.isAsleep) return;

        this.currentInteractable = object;
        this.player.isSpeaking = true;

        let targetWord = object.word;
        if (object instanceof Boss) {
            targetWord = object.words[object.currentWordIndex];
        }

        this.speechPanel.show(targetWord.en, targetWord.es);
    }

    async startListening() {
        if (!this.currentInteractable) return;

        this.speechPanel.setListening();
        this.scoreSystem.attempts++;

        let targetWord = this.currentInteractable.word;
        if (this.currentInteractable instanceof Boss) {
            targetWord = this.currentInteractable.words[this.currentInteractable.currentWordIndex];
        }

        try {
            const result = await this.speechSystem.listen();
            const isCorrect = this.speechSystem.compare(targetWord.en, result);

            this.speechPanel.setResult(result, isCorrect);

            if (isCorrect) {
                this.audioSystem.playCorrect();
                this.scoreSystem.addCorrectWord(true);
                this.resolveInteraction();
            } else {
                this.audioSystem.playWrong();
            }

            this.hud.updateStats(this.scoreSystem.getStats());
        } catch (err) {
            console.error(err);
            this.speechPanel.statusText.setText('Error with Mic', 'Error con el Mic');
        }
    }

    resolveInteraction() {
        const obj = this.currentInteractable;
        let done = true;

        if (obj instanceof Chest) {
            obj.open();
            this.scoreSystem.addCoins(50);
        } else if (obj instanceof Door) {
            obj.open();
        } else if (obj instanceof Bridge) {
            obj.activate();
        } else if (obj instanceof Enemy) {
            obj.sleep();
        } else if (obj instanceof NPC) {
            // NPC mission logic
        } else if (obj instanceof Boss) {
            const defeated = obj.takeDamage();
            if (!defeated) {
                done = false;
                // Show next word after a short delay
                this.time.delayedCall(1500, () => {
                    const nextWord = obj.words[obj.currentWordIndex];
                    this.speechPanel.show(nextWord.en, nextWord.es);
                });
            } else {
                this.scoreSystem.addPoints(100);
            }
        }

        if (done) {
            this.time.delayedCall(2000, () => {
                this.speechPanel.hide();
                this.player.isSpeaking = false;
                this.currentInteractable = null;
            });
        }
    }
}
