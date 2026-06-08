export default class Door extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, word) {
        super(scene, x, y, 'door');
        scene.add.existing(this);
        scene.physics.add.existing(this, true);

        this.word = word;
        this.isOpen = false;
    }

    open() {
        this.isOpen = true;
        this.alpha = 0.5;
        this.body.enable = false;
    }
}
