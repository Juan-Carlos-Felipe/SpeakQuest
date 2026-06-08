export default class Chest extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, word) {
        super(scene, x, y, 'chest');
        scene.add.existing(this);
        scene.physics.add.existing(this, true);

        this.word = word;
        this.isOpened = false;
    }

    open() {
        this.isOpened = true;
        this.setFrame(1); // Assuming frame 1 is open
    }
}
