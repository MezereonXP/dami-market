
import { Order } from "./order";
import { Goods } from "./goods";

export class OrderGoods{
    ogId:number;
    order:Order;
    goods:Goods;
    ogPrice:number;
    ogQuantity:number;
    ogStatus:number;

    
    constructor(ogId:number,

        order:Order,
    
        goods:Goods,
    
        ogPrice:number,
    
        ogQuantity:number,
    
        ogStatus:number) {
        
        this.ogId = ogId;
        this.order = order;
        this.goods = goods;
        this.ogPrice = ogPrice;
        this.ogQuantity = ogQuantity;
        this.ogStatus = ogStatus;
    }

}