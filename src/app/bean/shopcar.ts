//购物车实体类
import { Goods } from "./goods";
import { Customer } from "./customer";

export class Shopcar {

    sId: number;
    customer: Customer;
    goods: Goods;
    sQuantity: number;
    sStatus: number;
    /**
     *
     */
    constructor(sId: number, customer: Customer, goods: Goods, sQuantity: number, sStatus: number) {
        this.sId = sId;
        this.customer = customer;
        this.goods = goods;
        this.sQuantity = sQuantity;
        this.sStatus = sStatus;

    }

}