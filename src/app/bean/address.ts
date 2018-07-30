import { Customer } from "./customer";

export class Address{
    aId:number;

    customer:Customer;

    aReceiver:String;

    aTelephone:String;

    aZipcode:string;

    aDetail:string;

    aStatus:number;

    
    constructor(aId:number,

        customer:Customer,
    
        aReceiver:String,
    
        aTelephone:String,
    
        aZipcode:string,
    
        aDetail:string,
    
        aStatus:number) {
        
        this.aId = aId;
        this.customer = customer;
        this.aTelephone = aTelephone;
        this.aZipcode = aZipcode;
        this.aDetail = aDetail;
        this.aStatus = aStatus;
    }
}