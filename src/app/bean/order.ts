//订单实体类
import { Customer } from "./customer";
import { Address } from "./address";

export class Order {
    oId: number;
    oCode: string;
    customer: Customer;
    address: Address;
    oState: number;
    oType: number;
    oSetdate: string;
    oRemark: string;
    oStatus: number;
    
    
    constructor(oId: number, oCode: string,
    
        customer: Customer,
    
        address: Address,
    
        oState: number,
    
        oType: number,
    
        oSetdate: string,
    
        oRemark: string,
    
        oStatus: number) {
       
        this.oId = oId;
        this.oCode = oCode;
        this.customer = customer;
        this.address = address;
        this.oState = oState;
        this.oType = oType;
        this.oSetdate = oSetdate;
        this.oRemark = oRemark;
        this.oStatus = oStatus;
    }

}