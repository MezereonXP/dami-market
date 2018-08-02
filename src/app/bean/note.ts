//消息实体类
import { Customer } from "./customer";

export class Note {
    nId:number;
    customer:Customer;
    nTipTime:String;
    nNote:String;


    constructor(nId:number,customer:Customer,nTipTime:String,nNote:String) {
        
        this.nId = nId;
        this.customer = customer;
        this.nTipTime = nTipTime;
        this.nNote = nNote;
    }
}