import { Good } from "./good";
import { Config } from "./config";
import { GoodImg } from "./goodimg";

export class Shopping {
    goods: Good;
    config: Array<Config>;
    goodimg: Array<GoodImg>;
    constructor(goods: Good, config: Array<Config>, goodimg: Array<GoodImg>) {
        this.goods = goods;
        this.config = config;
        this.goodimg = goodimg;
    }
}