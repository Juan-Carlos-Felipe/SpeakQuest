import BootScene from './game/scenes/BootScene.js';
import MenuScene from './game/scenes/MenuScene.js';
import WorldSelectScene from './game/scenes/WorldSelectScene.js';
import GameScene from './game/scenes/GameScene.js';
import ResultScene from './game/scenes/ResultScene.js';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600 },
            debug: false
        }
    },
    scene: [
        BootScene,
        MenuScene,
        WorldSelectScene,
        GameScene,
        ResultScene
    ]
};

const game = new Phaser.Game(config);
