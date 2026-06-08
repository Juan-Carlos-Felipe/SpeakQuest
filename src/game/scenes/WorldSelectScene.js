import { worlds } from '../data/worlds.js';
import BilingualText from '../ui/BilingualText.js';

export default class WorldSelectScene extends Phaser.Scene {
    constructor() {
        super('WorldSelectScene');
    }

    create() {
        const { width } = this.scale;
        this.add.text(width / 2, 50, 'Select World / Selecciona Mundo', { fontSize: '32px' }).setOrigin(0.5);

        worlds.forEach((world, i) => {
            const y = 150 + (i * 120);
            const btn = new BilingualText(this, width / 2 - 150, y, world.nameEn, world.nameEs, { fill: '#ffff00' });
            const hitArea = this.add.rectangle(width / 2, y + 20, 400, 80, 0xffffff, 0.1).setInteractive();

            hitArea.on('pointerdown', () => {
                this.scene.start('GameScene', { worldIndex: i });
            });
        });

        const backBtn = this.add.text(50, 50, '< Back', { fontSize: '24px' }).setInteractive();
        backBtn.on('pointerdown', () => this.scene.start('MenuScene'));
    }
}
