import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Goods } from '../bean/goods';
import { OrderGoods } from '../bean/ordergoods';
import { Order } from '../bean/order';
import { Router } from '../../../node_modules/@angular/router';

export interface DialogData {
  kgId: number;
  goods: Goods;
  kgPrice: number;
  kgMsg: string;
  cId: number;
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
  cId: number;
  orderGoodList: Array<OrderGoods>;
  orderGoods$: OrderGoods;



  constructor(public dialogRef: MatDialogRef<KilltipsComponent>, private router: Router,

    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }


  ngOnInit() {
    this.kgId = this.data.kgId;
    this.kgPrice = this.data.kgPrice;
    this.kgMsg = this.data.kgMsg;
    this.kgName = this.data.goods.gName;
    this.cId = this.data.cId;

    if (this.kgMsg == "抢购成功") {
      this.isShowButton = true;
    } else {
      this.isShowButton = false;
    }
  }

  onClickSuccess(): void {

    //   this.orderGoods$.goods=this.data.goods;
    //   this.orderGoods$.ogPrice=this.kgPrice;
    //   this.orderGoods$.ogQuantity=1;
    //   this.orderGoods$.ogStatus=1;
    //   this.orderGoods$.order.oType=3;
    //   this.orderGoods$.order.customer.cId=this.cId;
    //   this.orderGoodsList.push(this.orderGoods$);
    //   this.router.navigate(['order'], 
    //  {
    //      queryParams:{
    //        orderGoodList:JSON.stringify(this.orderGoodsList)
    //      }
    //    }
    //  )
    this.data.kgMsg = "抢购成功";
    this.dialogRef.close(this.data);
  }

  onClickFail(): void {
    this.data.kgMsg = "抢购失败";
    this.dialogRef.close(this.data);
  }

}

