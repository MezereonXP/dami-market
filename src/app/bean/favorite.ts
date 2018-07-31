import { Good } from "./good";
import { Customer } from "./customer";

export class Favorite {

    fId: number;
    customer: Customer;
    goods: Good;
    fStatus: number;
    /**
     *
     */
    constructor(fId: number, customer: Customer, goods: Good, fStatus: number) {
        this.fId = fId;
        this.customer = customer;
        this.goods = goods;
        this.fStatus = fStatus;

    }

}