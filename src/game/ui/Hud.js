import BilingualText from './BilingualText.js';

export default class Hud extends Phaser.GameObjects.Container {
    constructor(scene) {
        super(scene, 20, 20);
        scene.add.existing(this);
        this.setScrollFactor(0);

        this.scoreText = new BilingualText(scene, 0, 0, 'Score: 0', 'Puntos: 0');
        this.coinsText = new BilingualText(scene, 200, 0, 'Coins: 0', 'Monedas: 0');
        this.livesText = new BilingualText(scene, 400, 0, 'Lives: 3', 'Vidas: 3');

        this.add([this.scoreText, this.coinsText, this.livesText]);
    }

    updateStats(stats) {
        this.scoreText.setText(`Score: ${stats.score}`, `Puntos: ${stats.score}`);
        this.coinsText.setText(`Coins: ${stats.coins}`, `Monedas: ${stats.coins}`);
        this.livesText.setText(`Lives: ${stats.lives}`, `Vidas: ${stats.lives}`);
    }
}
