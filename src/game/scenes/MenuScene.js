import BilingualText from '../ui/BilingualText.js';

export default class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    create() {
        const { width, height } = this.scale;

        this.add.text(width / 2, 100, 'SpeakQuest', { fontSize: '64px', fill: '#fff' }).setOrigin(0.5);
        new BilingualText(this, width / 2 - 150, 180, 'Your voice is your power', 'Tu voz es tu poder');

        const startBtn = this.createButton(width / 2, 300, 'Start Adventure', 'Comenzar aventura', () => {
            this.scene.start('WorldSelectScene');
        });

        const howToBtn = this.createButton(width / 2, 400, 'How to Play', 'Cómo jugar', () => {
            this.showHowToPlay();
        });
    }

    createButton(x, y, en, es, callback) {
        const btn = new BilingualText(this, x - 100, y, en, es, { fill: '#00ff00' });
        const hitArea = this.add.rectangle(x, y + 20, 300, 60, 0x000000, 0).setInteractive();
        hitArea.on('pointerdown', callback);
        return btn;
    }

    showHowToPlay() {
        const { width, height } = this.scale;
        const panel = this.add.rectangle(width / 2, height / 2, 600, 400, 0x222222, 0.9);
        const closeBtn = this.add.text(width / 2 + 280, height / 2 - 180, 'X', { fontSize: '32px' }).setInteractive();

        const instructions = [
            ['Move: Arrow keys or A/D', 'Moverse: Flechas o A/D'],
            ['Jump: Space', 'Saltar: Espacio'],
            ['Run: Shift', 'Correr: Shift'],
            ['Speak: Microphone button', 'Hablar: botón de micrófono'],
            ['Your voice opens doors and more!', '¡Tu voz abre puertas y más!']
        ];

        const group = this.add.group();
        group.add(panel);
        group.add(closeBtn);

        instructions.forEach((inst, i) => {
            group.add(new BilingualText(this, width / 2 - 250, height / 2 - 150 + (i * 60), inst[0], inst[1]));
        });

        closeBtn.on('pointerdown', () => {
            group.destroy(true);
        });
    }
}
