import { Component, OnInit } from '@angular/core';
import { DataService } from '../data/data.service';

import { forEach } from '@angular/router/src/utils/collection';
import { Shopcar } from '../../app/bean/shopcar';
import { Order } from '../bean/order';
import { Customer } from '../bean/customer';
import { Address } from '../bean/address';
import { OrderGoods } from '../bean/ordergoods';
@Component({
  selector: 'app-shopcar',
  templateUrl: './shopcar.component.html',
  styleUrls: ['./shopcar.component.scss']
})
export class ShopcarComponent implements OnInit {

  orderType:number;
  customer:Customer;
  address:Address;
  goods: Array<Shopcar>;
  recommendGoods: Object;
  isSelectAll = false;
  status: Array<boolean>;
  //quantity: Array<number>;
  count: number = 0;
  selectNum: number = 0;
  totalMoney: number = 0;
  newOrder:Order;
  newOrderGoodsList:Array<OrderGoods>;
  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getShopCarGoods(1).subscribe(
      result => {
        this.status = new Array<boolean>();
        //this.quantity = new Array();
        for (let i = 0; i < result["data"].length; i++) {
          this.status.push(false);

          this.count++;
        }
        console.log(result["data"]);
        this.goods = result["data"];

        // for (let i = 0; i < this.goods.length; i++){
        //   this.quantity.push(this.goods[i].count)
        // }
      }
    );
    this.data.getRecommendGoods(1).subscribe(
      result => {
        this.recommendGoods = result["data"];
      }
    )
  }

  changeStatus() {
    if (this.isSelectAll) {
      this.setStatus(false);
      this.totalMoney = 0;
    } else {
      this.setStatus(true);
      this.totalMoney = 0;
      for (let i = 0; i < this.goods.length; i++) {

        this.totalMoney += this.goods[i].goods.gPrice * this.goods[i].sQuantity;
      }
    }
    this.changeQuantity(-1);


  }


  deleteGoodsFromShopcar(i) {
    this.goods[i].sStatus = 0;
    console.log("刷新！");
    this.data.editQuantityOfGoods(this.goods[i]).subscribe();
    window.location.reload();
  }

  addNewOrder() {

    this.newOrder = new Order(null,null,this.customer,this.address,1,this.orderType,"2000-1-1","666",1);
    for (let i = 0; i < this.count; i++) {
      if (this.status[i]) {
        let newOrderGoods = new OrderGoods(null,this.newOrder,this.goods[i].goods,this.goods[i].goods.gPrice,this.goods[i].sQuantity,1)
        this.newOrderGoodsList.push(newOrderGoods);
      }
    }
    

  }

  editQuantityOfGoods(n) {

    if (this.goods[n].sQuantity > this.goods[n].goods.gStock) {
      alert("不能超过最大库存量" + this.goods[n].goods.gStock);
      this.goods[n].sQuantity = this.goods[n].goods.gStock;
    } else {
      this.data.editQuantityOfGoods(this.goods[n]).subscribe();
    }


  }
  reduce(i) {

    this.goods[i].sQuantity--;
    if (this.goods[i].sQuantity < 1) {
      this.goods[i].sQuantity = 1;
    }
    console.log(this.goods[i].sQuantity);
    this.editQuantityOfGoods(i);
    this.changeTatalMoney();
  }
  increase(i) {
    this.goods[i].sQuantity++;
    if (this.goods[i].sQuantity > this.goods[i].goods.gStock) {
      this.goods[i].sQuantity = this.goods[i].goods.gStock;
    }
    console.log(this.goods[i].sQuantity);
    this.editQuantityOfGoods(i);
    this.changeTatalMoney();
  }
  changeTatalMoney() {
    this.totalMoney = 0;
    for (let i = 0; i < this.count; i++) {
      if (this.status[i]) {
        this.totalMoney += this.goods[i].goods.gPrice * this.goods[i].sQuantity;

      }
    }

  }
  changeSelectAllStatus(i, item) {
    this.changeQuantity(i);
    if (!this.status[i]) {
      this.totalMoney += this.goods[i].goods.gPrice * this.goods[i].sQuantity;
    } else {
      this.totalMoney -= this.goods[i].goods.gPrice * this.goods[i].sQuantity;
    }
    for (let i = 0; i < this.count; i++) {
      if (this.status[i]) {
        this.isSelectAll = false;
      }
    }
    this.status[i] = !this.status[i];
    this.isSelectAll = true;
    for (let i = 0; i < this.count; i++) {
      if (!this.status[i]) {
        this.isSelectAll = false;
      }
    }
    this.status[i] = !this.status[i];
  }
  changeQuantity(i) {
    let n = 0;
    if (i != -1) {
      this.status[i] = !this.status[i];
    }
    for (let i = 0; i < this.count; i++) {
      if (this.status[i]) {
        n++;
      }
    }
    if (i != -1) {
      this.status[i] = !this.status[i];
    }
    this.selectNum = n;
  }
  setStatus(flag) {

    for (let i = 0; i < this.count; i++) {
      this.status[i] = (flag);
    }
  }

}
