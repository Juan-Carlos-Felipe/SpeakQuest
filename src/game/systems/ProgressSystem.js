/**
 * ProgressSystem handles LocalStorage persistence.
 */
export default class ProgressSystem {
    constructor() {
        this.storageKey = 'speakquest_progress';
        this.data = this.load();
    }

    load() {
        const saved = localStorage.getItem(this.storageKey);
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error("Failed to parse progress", e);
            }
        }
        return {
            totalScore: 0,
            totalCoins: 0,
            currentWorld: 0,
            unlockedLevels: [0],
            completedWords: [],
            achievements: []
        };
    }

    save(newData) {
        this.data = { ...this.data, ...newData };
        localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    }

    updateAfterLevel(stats) {
        this.data.totalScore += stats.score;
        this.data.totalCoins += stats.coins;
        // Logic for unlocking next level
        this.save(this.data);
    }

    unlockAchievement(id) {
        if (!this.data.achievements.includes(id)) {
            this.data.achievements.push(id);
            this.save(this.data);
            return true;
        }
        return false;
    }
}
