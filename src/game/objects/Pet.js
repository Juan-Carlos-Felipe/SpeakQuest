export default class Pet extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y);
        scene.add.existing(this);

        this.echo = scene.add.sprite(0, 0, 'echo');
        this.add(this.echo);

        this.target = null;
        this.offset = { x: -30, y: -40 };

        scene.tweens.add({
            targets: this.echo,
            y: -5,
            duration: 1000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
    }

    setTarget(target) {
        this.target = target;
    }

    update() {
        if (this.target) {
            const tx = this.target.x + (this.target.flipX ? -this.offset.x : this.offset.x);
            const ty = this.target.y + this.offset.y;

            this.x = Phaser.Math.Linear(this.x, tx, 0.1);
            this.y = Phaser.Math.Linear(this.y, ty, 0.1);

            this.echo.flipX = this.target.flipX;
        }
    }

    showMessage(textEn, textEs) {
        // Logic to show a small bubble
        console.log(`Echo says: ${textEn} / ${textEs}`);
    }
}
