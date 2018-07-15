export class Teamgoods {
    teamGoodsId: number;
    name: string;
    originPrice: number;
    nowPrice: number;
    date: string;
    nowTeam: number;
    leftTeam: number;
    pic: string;

    constructor(teamGoodsId: number,
        name: string,
        originPrice: number,
        nowPrice: number,
        date: string,
        nowTeam: number,
        leftTeam: number,
        pic: string) {
        this.teamGoodsId = teamGoodsId;
        this.name = name;
        this.originPrice = originPrice;
        this.nowPrice = nowPrice;
        this.date = date;
        this.nowTeam = nowTeam;
        this.leftTeam = leftTeam;
        this.pic = pic;
    }
}
