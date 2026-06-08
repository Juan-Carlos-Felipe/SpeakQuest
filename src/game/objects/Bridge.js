export default class Bridge extends Phaser.GameObjects.Container {
    constructor(scene, x, y, word) {
        super(scene, x, y);
        scene.add.existing(this);

        this.word = word;
        this.isActivated = false;

        this.bridgeSprite = scene.add.sprite(0, 0, 'bridge');
        this.bridgeSprite.alpha = 0.3;
        this.add(this.bridgeSprite);

        scene.physics.add.existing(this, true);
        this.body.enable = false;
    }

    activate() {
        this.isActivated = true;
        this.bridgeSprite.alpha = 1;
        this.body.enable = true;
    }
}
