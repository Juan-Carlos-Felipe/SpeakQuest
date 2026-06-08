export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        this.setOrigin(0.5, 1);

        this.stats = {
            speed: 160,
            runSpeed: 250,
            jumpForce: -400
        };

        this.isSpeaking = false;
    }

    update(cursors) {
        if (this.isSpeaking) {
            this.setVelocityX(0);
            return;
        }

        const isRunning = cursors.shift.isDown;
        const currentSpeed = isRunning ? this.stats.runSpeed : this.stats.speed;

        const left = cursors.left.isDown || (cursors.A && cursors.A.isDown);
        const right = cursors.right.isDown || (cursors.D && cursors.D.isDown);
        const up = cursors.up.isDown || cursors.space.isDown || (cursors.W && cursors.W.isDown);

        if (left) {
            this.setVelocityX(-currentSpeed);
            this.flipX = true;
        } else if (right) {
            this.setVelocityX(currentSpeed);
            this.flipX = false;
        } else {
            this.setVelocityX(0);
        }

        if (up && this.body.blocked.down) {
            this.setVelocityY(this.stats.jumpForce);
        }
    }
}
