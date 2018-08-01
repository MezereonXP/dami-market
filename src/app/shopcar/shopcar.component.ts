import { Component, OnInit } from '@angular/core';
import { DataService } from '../data/data.service';

import { forEach } from '@angular/router/src/utils/collection';
import { Shopcar } from '../../app/bean/shopcar';
import { Order } from '../bean/order';
import { Customer } from '../bean/customer';
import { Address } from '../bean/address';
import { OrderGoods } from '../bean/ordergoods';
import { Router } from '@angular/router';
@Component({
  selector: 'app-shopcar',
  templateUrl: './shopcar.component.html',
  styleUrls: ['./shopcar.component.scss']
})
export class ShopcarComponent implements OnInit {


  isLogin: boolean = false;
  phone: String;
  customer: Customer;
  shopcar: Shopcar;
  goods: Array<Shopcar>;
  recommendGoods: Object;
  isSelectAll = false;
  status: Array<boolean>;
  //quantity: Array<number>;
  count: number = 0;
  selectNum: number = 0;
  totalMoney: number = 0;
  newOrder: Order;
  newOrderGoodsList: Array<OrderGoods> = new Array<OrderGoods>();
  newOrderGoods: OrderGoods;
  constructor(private data: DataService, private router: Router) { }

  ngOnInit() {

    this.data.checklogin().subscribe(
      result => {
        this.phone = result["data"];
        this.isLogin = result["status"];
        if (this.isLogin) {
          this.data.getCustomerByPhone(this.phone).subscribe(
            result => {
              this.customer = result["data"];
              this.data.getShopCarGoods(this.customer.cId).subscribe(
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
              this.data.getRecommendGoods(this.customer.cId).subscribe(
                result => {
                  this.recommendGoods = result["data"];
                }
              )
            }
          );
        } else {
          this.router.navigate(["login"]);
        }
      }
    );


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

  addGoodsToShopcar(n) {


    this.shopcar = new Shopcar(null, this.customer, this.recommendGoods[n], 1, 1);
    this.data.addGoodsToShopcar(this.shopcar).subscribe();

  }
  deleteGoodsFromShopcar(i) {
    this.goods[i].sStatus = 0;
    console.log("刷新！");
    this.data.editQuantityOfGoods(this.goods[i]).subscribe();
    window.location.reload();
  }

  toSetNewOrder() {
    let flag = false;
    for (let i = 0; i < this.count; i++) {
      if (this.status[i]) {
        flag = true;
      }
    }

    if (flag) {
      this.newOrder = new Order(null, null, this.customer, null, 1, 1, null, null, 1);
      for (let i = 0; i < this.count; i++) {
        if (this.status[i]) {
          this.newOrderGoods = new OrderGoods(null, this.newOrder, this.goods[i].goods, this.goods[i].goods.gPrice, this.goods[i].sQuantity, 1)
          this.newOrderGoodsList.push(this.newOrderGoods);
        }
      }

      this.router.navigate(['order'], {
        queryParams: {
          orderGoodsList: JSON.stringify(this.newOrderGoodsList)

        }

      })

    } else {
      alert("请至少选择一个商品");
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
