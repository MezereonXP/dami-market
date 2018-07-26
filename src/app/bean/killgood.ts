export  class killgood{
    kgId:number;
    kgGood:object;
    kgQuantity:number;
    kgTime:number;
    kgPrice:number;

    constructor(kgId:number,kgGood:object, kgQuantity:number, kgTime:number,kgPrice:number){
        this.kgId=kgId;
        this.kgGood=kgGood;
        this.kgQuantity=kgQuantity;
        this.kgTime=kgTime;
        this.kgPrice=kgPrice;
    }
}