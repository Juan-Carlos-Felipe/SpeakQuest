export default class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
        // Create simple placeholders
        this.createPlaceholders();
    }

    createPlaceholders() {
        const graphics = this.make.graphics();

        // Player
        graphics.fillStyle(0x00ff00);
        graphics.fillRect(0, 0, 32, 48);
        graphics.generateTexture('player', 32, 48);
        graphics.clear();

        // Echo (Pet)
        graphics.fillStyle(0x00ffff);
        graphics.fillCircle(16, 16, 16);
        graphics.generateTexture('echo', 32, 32);
        graphics.clear();

        // Chest
        graphics.fillStyle(0x8b4513);
        graphics.fillRect(0, 0, 32, 32);
        graphics.generateTexture('chest', 32, 32);
        graphics.clear();

        // Door
        graphics.fillStyle(0x444444);
        graphics.fillRect(0, 0, 32, 64);
        graphics.generateTexture('door', 32, 64);
        graphics.clear();

        // Enemy
        graphics.fillStyle(0xff0000);
        graphics.fillRect(0, 0, 32, 32);
        graphics.generateTexture('enemy', 32, 32);
        graphics.clear();

        // Boss
        graphics.fillStyle(0x440044);
        graphics.fillRect(0, 0, 64, 96);
        graphics.generateTexture('boss', 64, 96);
        graphics.clear();

        // Tiles
        graphics.fillStyle(0x666666);
        graphics.fillRect(0, 0, 32, 32);
        graphics.generateTexture('ground', 32, 32);
        graphics.clear();

        // Bridge
        graphics.fillStyle(0xaa8844);
        graphics.fillRect(0, 0, 128, 16);
        graphics.generateTexture('bridge', 128, 16);
    }

    create() {
        this.scene.start('MenuScene');
    }
}
