import { GoodImg } from "./goodimg";

export class Config {
    id: number;
    cfg_goods_id: number;
    cfg_type: number;
    cfg_pricedata: number;
    cfg_description: string;
    goodimg: Array<GoodImg>;

    constructor(id: number, cfg_goods_id: number, cfg_type: number, cfg_pricedata: number, cfg_description: string, goodimg: Array<GoodImg>) {
        this.id = id;
        this.cfg_goods_id = cfg_goods_id;
        this.cfg_type = cfg_type;
        this.cfg_pricedata = cfg_pricedata;
        this.cfg_description = cfg_description;
        this.goodimg = goodimg;
    }
} 