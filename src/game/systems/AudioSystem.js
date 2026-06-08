/**
 * AudioSystem handles sound effects and music.
 * Since we don't have real assets, this is a placeholder/wrapper.
 */
export default class AudioSystem {
    constructor(scene) {
        this.scene = scene;
    }

    play(key) {
        // In a real app: this.scene.sound.play(key);
        console.log(`Playing sound: ${key}`);
    }

    playCorrect() { this.play('correct'); }
    playWrong() { this.play('wrong'); }
    playCoin() { this.play('coin'); }
    playJump() { this.play('jump'); }
    playLevelComplete() { this.play('complete'); }
}
