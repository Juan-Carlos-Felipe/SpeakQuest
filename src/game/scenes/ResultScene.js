import BilingualText from '../ui/BilingualText.js';

export default class ResultScene extends Phaser.Scene {
    constructor() {
        super('ResultScene');
    }

    init(data) {
        this.stats = data.stats;
    }

    create() {
        const { width, height } = this.scale;

        this.add.text(width / 2, 80, 'Level Complete!', { fontSize: '48px' }).setOrigin(0.5);
        this.add.text(width / 2, 130, '¡Nivel Completado!', { fontSize: '32px', fill: '#ccc' }).setOrigin(0.5);

        const statsY = 220;
        new BilingualText(this, width / 2 - 150, statsY, `Score: ${this.stats.score}`, `Puntos: ${this.stats.score}`);
        new BilingualText(this, width / 2 - 150, statsY + 60, `Coins: ${this.stats.coins}`, `Monedas: ${this.stats.coins}`);
        new BilingualText(this, width / 2 - 150, statsY + 120, `Accuracy: ${this.stats.accuracy}%`, `Precisión: ${this.stats.accuracy}%`);

        const starsStr = '⭐'.repeat(this.stats.stars);
        this.add.text(width / 2, statsY + 200, starsStr, { fontSize: '64px' }).setOrigin(0.5);

        const continueBtn = this.add.rectangle(width / 2, 520, 300, 60, 0x00ff00, 1).setInteractive();
        this.add.text(width / 2, 520, 'Continue / Continuar', { fontSize: '24px', fill: '#000' }).setOrigin(0.5);

        continueBtn.on('pointerdown', () => {
            this.scene.start('WorldSelectScene');
        });
    }
}
