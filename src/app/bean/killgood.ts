//秒杀商品实体类
import { Goods } from "./goods";

export  class killgood{
    kgId:number;
    kgGood:Goods;
    kgQuantity:number;
    kgTime:number;
    kgPrice:number;

    constructor(kgId:number,kgGood:Goods, kgQuantity:number, kgTime:number,kgPrice:number){
        this.kgId=kgId;
        this.kgGood=kgGood;
        this.kgQuantity=kgQuantity;
        this.kgTime=kgTime;
        this.kgPrice=kgPrice;
    }
}