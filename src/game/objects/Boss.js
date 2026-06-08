export default class Boss extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, name, words) {
        super(scene, x, y, 'boss');
        scene.add.existing(this);
        scene.physics.add.existing(this, true);

        this.bossName = name;
        this.words = words; // Array of 3 words
        this.currentWordIndex = 0;
        this.health = 3;
    }

    takeDamage() {
        this.health--;
        this.currentWordIndex++;
        return this.health <= 0;
    }
}
