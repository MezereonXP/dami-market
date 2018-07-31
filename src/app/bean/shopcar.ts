import { Good } from "./good";
import { Customer } from "./customer";

export class Shopcar {

    sId: number;
    customer: Customer;
    goods: Good;
    sQuantity: number;
    sStatus: number;
    /**
     *
     */
    constructor(sId: number, customer: Customer, goods: Good, sQuantity: number, sStatus: number) {
        this.sId = sId;
        this.customer = customer;
        this.goods = goods;
        this.sQuantity = sQuantity;
        this.sStatus = sStatus;

    }

}