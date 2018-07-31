export class KillGoods{
  
    kgId:number;
    kgName:string;
    kgPrice:number;
    url:string;

    constructor(kgId:number,kgName:string,kgPrice:number,url:string){
        this.kgId=kgId;
        this.kgName=kgName;
        this.kgPrice=kgPrice;
        this.url=url;
    }
}