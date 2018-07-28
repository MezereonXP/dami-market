import { Good } from "./good";
import { Customer } from "./customer";

export class Favorite {

    fId: number;
    customer: Customer;
    good: Good;
    fStatus: number;
    /**
     *
     */
    constructor(fId: number, customer: Customer, good: Good, fStatus: number) {
        this.fId = fId;
        this.customer = customer;
        this.good = good;
        this.fStatus = fStatus;

    }

}