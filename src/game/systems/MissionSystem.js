/**
 * MissionSystem handles NPC missions.
 */
export default class MissionSystem {
    constructor() {
        this.activeMissions = [];
    }

    startMission(missionId) {
        if (!this.activeMissions.includes(missionId)) {
            this.activeMissions.push(missionId);
            return true;
        }
        return false;
    }

    isMissionActive(missionId) {
        return this.activeMissions.includes(missionId);
    }
}
