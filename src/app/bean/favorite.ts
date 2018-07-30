import { Customer } from "./customer";
import { Goods } from "./goods";

export class Favorite {
    fId:number;

    customer:Customer;

    goods:Goods;

    fStatus:number;

    
    constructor(fId:number,

        customer:Customer,
    
        goods:Goods,
    
        fStatus:number) {
        this.customer=customer;
        this.fId=fId;
        this.fStatus=fStatus;
        this.goods=goods;
    }
}