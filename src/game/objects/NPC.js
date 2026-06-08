export default class NPC extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, missionId) {
        super(scene, x, y, texture);
        scene.add.existing(this);

        this.missionId = missionId;
        this.setInteractive();
    }
}
