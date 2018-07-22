export class OrderGoods {

    pics: string;
    name: string;
    price: number;
    quantity: number;
    constructor(pics: string,name: string,price: number,quantity: number) {
      this.pics = pics;
      this.name = name;
      this.price = price;
      this.quantity = quantity;
    }
  
  }