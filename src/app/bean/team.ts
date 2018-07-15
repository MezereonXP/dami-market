export class Team {
    teamId: number;
    nowPeople: number;
    leftPeople: number;
    hide: boolean;
    constructor(teamId: number,
        nowPeople: number,
        leftPeople: number,
        hide: boolean) {
        this.teamId = teamId;
        this.nowPeople = nowPeople;
        this.leftPeople = leftPeople;
        this.hide = hide;
    }
}