//商品配置(颜色，版本)
import { Good } from "./good";

export class Config {
    cfgId: number;
    goods: Good;
    cfgType: number;
    cfgPricedata: number;
    cfgDescription: string;

    constructor(cfgId: number, goods: Good, cfgType: number, cfgPricedata: number, cfgDescription: string) {
        this.cfgId = cfgId;
        this.goods = goods;
        this.cfgType = cfgType;
        this.cfgPricedata = cfgPricedata;
        this.cfgDescription = cfgDescription;
    }
} 