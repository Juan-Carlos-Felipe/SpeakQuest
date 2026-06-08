export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, word) {
        super(scene, x, y, 'enemy');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.word = word;
        this.isAsleep = false;
    }

    sleep() {
        this.isAsleep = true;
        this.setAlpha(0.5);
        this.body.enable = false;
    }
}
