import { Injectable } from "@angular/core";
import { OrderGoods } from "../bean/ordergood";
import { Order } from "../bean/order";

@Injectable()
export class OrderService {
  orderGoodsList: Array<OrderGoods>;
  tId: number;
  order: Order;
  constructor() { }
}