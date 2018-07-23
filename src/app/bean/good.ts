export class Good{
  id:number;
  name:string;
  pic: string;
  price: number;
  comment: string;

  constructor(id:number,name:string, pic: string, price: number, comment: string){
    this.id = id;
    this.name = name;
    this.pic = pic;
    this.price = price;
    this.comment = comment;
  }
} 