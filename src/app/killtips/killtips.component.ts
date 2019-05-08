import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Goods } from '../bean/goods';
import { OrderGoods } from '../bean/ordergoods';
import { Order } from '../bean/order';
import { Router } from '../../../node_modules/@angular/router';
import { Customer } from '../bean/customer';

export interface DialogData {
  kgId: number;
  goods: Goods;
  kgPrice: number;
  kgMsg: string;
  customer: Customer;
}

@Component({
  selector: 'app-killtips',
  templateUrl: './killtips.component.html',
  styleUrls: ['./killtips.component.scss']
})
export class KilltipsComponent implements OnInit {

  msg = "正在等待抢购结果。。。";
  isShowButton: boolean;
  kgId: number;
  kgPrice: number;
  kgMsg: string;
  kgName: string;
  customer: Customer;
  orderGoodsList: Array<OrderGoods>;
  orderGoods$: OrderGoods;



  constructor(public dialogRef: MatDialogRef<KilltipsComponent>, private router: Router,

    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }


  ngOnInit() {
    this.kgId = this.data.kgId;
    this.kgPrice = this.data.kgPrice;
    this.kgMsg = this.data.kgMsg;
    this.kgName = this.data.goods.gName;
    this.customer = this.data.customer;

    if (this.kgMsg == "抢购成功") {
      this.isShowButton = true;
    } else {
      this.isShowButton = false;
    }
  }

  onClickSuccess(): void {
      let order = new Order(null,null,null,null,1,null,null,null,1);
      this.orderGoods$ = new OrderGoods(null,null,null,null,null,1);
      this.orderGoodsList = new Array<OrderGoods>();
      this.orderGoods$.goods=this.data.goods;
      this.orderGoods$.ogPrice=this.kgPrice;
      this.orderGoods$.ogQuantity=1;
      this.orderGoods$.ogStatus=1;
      this.orderGoods$.order = order;
      this.orderGoods$.order.oType=3;
      this.orderGoods$.order.customer=this.customer;

      this.orderGoodsList.push(this.orderGoods$);
      //console.log(JSON.stringify(this.orderGoodList));
      this.router.navigate(['order'], 
     {
         queryParams:{
           orderGoodsList:JSON.stringify(this.orderGoodsList)
         }
       }
     )
    this.data.kgMsg = "抢购成功";
    this.dialogRef.close(this.data);
  }

  onClickFail(): void {
    this.data.kgMsg = "抢购失败";
    this.dialogRef.close(this.data);
  }

}

