//商品配置对应图片
export class GoodImg {
    id: number;
    cfgId: number;
    giImg: string;

    constructor(id: number, cfgId: number, giImg: string) {
        this.id = id;
        this.cfgId = cfgId;
        this.giImg = giImg;
    }
} 