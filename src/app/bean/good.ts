import { Config } from "./config";

export class Good{
  id:number;
  name:string;
  pic: string;
  price: number;
  comment: string;
  config:Array<Config>;

  constructor(id:number,name:string, pic: string, price: number, comment: string,config: Array<Config>){
    this.id = id;
    this.name = name;
    this.pic = pic;
    this.price = price;
    this.comment = comment;
    this.config = config;
  }
} 