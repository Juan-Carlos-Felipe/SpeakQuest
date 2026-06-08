/**
 * ScoreSystem handles points, streaks, and stars.
 */
export default class ScoreSystem {
    constructor() {
        this.score = 0;
        this.streak = 0;
        this.coins = 0;
        this.lives = 3;
        this.correctWords = 0;
        this.attempts = 0;
    }

    addPoints(points) {
        this.score += points;
    }

    addCorrectWord(firstAttempt = false) {
        this.correctWords++;
        this.streak++;

        let points = 10;
        if (firstAttempt) points += 5;

        if (this.streak >= 5) {
            points += 20;
            // Streak bonus logic could go here
        }

        this.addPoints(points);
    }

    resetStreak() {
        this.streak = 0;
    }

    addCoins(amount) {
        this.coins += amount;
    }

    loseLife() {
        this.lives--;
        this.resetStreak();
        return this.lives > 0;
    }

    calculateStars() {
        if (this.attempts === 0) return 0;
        const accuracy = (this.correctWords / this.attempts) * 100;

        if (accuracy >= 90) return 3;
        if (accuracy >= 70) return 2;
        return 1;
    }

    getStats() {
        return {
            score: this.score,
            coins: this.coins,
            correctWords: this.correctWords,
            attempts: this.attempts,
            accuracy: this.attempts > 0 ? Math.round((this.correctWords / this.attempts) * 100) : 0,
            stars: this.calculateStars()
        };
    }
}
