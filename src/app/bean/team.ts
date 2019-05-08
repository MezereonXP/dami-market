export class Team {
    teamId: number;
    nowPeople: number;
    leftPeople: number;
    maxTeam : number;
    hide: boolean;
    constructor(teamId: number,
        nowPeople: number,
        leftPeople: number,
        maxTeam:number,
        hide: boolean) {
        this.teamId = teamId;
        this.nowPeople = nowPeople;
        this.leftPeople = leftPeople;
        this.maxTeam = maxTeam;
        this.hide = hide;
    }
}