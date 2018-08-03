import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from '../data/data.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TeamCustomer } from '../bean/teamcustomer';
import { Order } from '../bean/order';
import { Router } from '../../../node_modules/@angular/router';
import { Teamgoods } from '../bean/teamgoods';
import { Address } from '../bean/address';
import { Good } from '../bean/good';
import { OrderGoods } from '../bean/ordergood';
import { Customer } from '../bean/customer';
import { OrderService } from '../data/order.service';

@Component({
  selector: 'app-teamdisplay',
  templateUrl: './teamdisplay.component.html',
  styleUrls: ['./teamdisplay.component.scss']
})
export class TeamdisplayComponent implements OnInit {

  tId: number ;
  tgId: number;
  teamCustomer$ :TeamCustomer;
  cId:number = 1;
  customer : Customer = new Customer(this.cId,null,null,1,null,null,null,null,null,null,1);
  TeamGood: Teamgoods = new Teamgoods(1, null, 1, 1, null, 1, 1, null);
  newAddress: Address = new Address(null, this.customer, null, null, null, null, 1);
  newOrder: Order = new Order(null,null,this.customer,this.newAddress,1,2,null,null,1);
  good: Good = new Good(null,null,null,null,null,null,null);
  orderGoods : OrderGoods = new OrderGoods(null,this.newOrder,this.good,this.TeamGood.nowPrice,1,1);
  orderGoodsList :Array<OrderGoods> = new Array<OrderGoods>();
  constructor(public dialogRef: MatDialogRef<TeamdisplayComponent>, private orderService: OrderService,
    @Inject(MAT_DIALOG_DATA) public data1: DialogData, private data2: DataService,private router:Router) {
      this.tId = this.data1.tId;
      this.tgId = this.data1.tgId;
      this.newOrder = this.data1.newOrder;
      this.cId = this.data1.cId;
     }

  ngOnInit() {
    this.data2.getCustomerById(this.cId).subscribe(
      result => {
        this.orderGoods.order.customer = result["data"];
      }
    );
    this.data2.getTeamByTId(this.tId).subscribe(
      result => {
        this.teamCustomer$ = result["data"];
      }
    );
    this.data2.getTeamGoodById(this.tgId).subscribe(
      result => {
        this.orderGoods.ogPrice = result["data"].nowPrice;
      });
    this.data2.getGoodsByTgId(this.tgId).subscribe(
      result => {
        this.orderGoods.goods = result["data"];
      });
  }
  sendOrder(){
    this.orderGoodsList.push(this.orderGoods);
    window.alert("参团成功");
    //递送order方法
    this.orderService.orderGoodsList = this.orderGoodsList;
    this.orderService.tId = this.tId;
    this.router.navigate(['order']);
  }

}
export interface DialogData {
  newOrder: Order;
  tId:number;
  tgId:number;
  cId: number;
}
