import { Component, OnInit } from '@angular/core';
import { DataService } from '../data/data.service';
import { Customer } from '../bean/customer';
import { Order } from '../bean/order';
import { Favorite } from '../bean/favorite';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Good } from '../bean/good';
import { OrderGoods } from '../bean/ordergoods';
@Component({
  selector: 'app-selfcenter',
  templateUrl: './selfcenter.component.html',
  styleUrls: ['./selfcenter.component.scss']
})
export class SelfcenterComponent implements OnInit {

  isLogin: boolean = false;
  phone: String;

  orderList: Array<Order>;
  favoriteList: Array<Favorite>;
  newCustomer: Customer = new Customer(1, null, null, 1, null, null, null, null, null, null, 1);

  orderGoodsList: Array<OrderGoods>;
  goods: Array<Good> = new Array<Good>();
  goodsData: Array<Array<Good>> = new Array<Array<Good>>();

  oNum1: number = 0;
  oNum2: number = 0;
  oNum3: number = 0;
  fNum4: number = 0;

  flag = [true, false, false, false, false];

  constructor(private data: DataService, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.goodsData.push(new Array<Good>());
    this.goodsData.push(new Array<Good>());
    this.goodsData.push(new Array<Good>());
    this.data.checklogin().subscribe(
      result => {
        this.phone = result["data"];
        this.isLogin = result["status"];
        if (this.isLogin) {
          this.data.getCustomerByPhone(this.phone).subscribe(
            result => {
              this.newCustomer = result["data"];
              this.initNum();
              this.setFavouriteNum();
              this.initGoodsData();
              this.spinner.hide();
            }
          );
        } else {
          this.router.navigate(["login"]);
        }
      }
    );
  }

  initNum() {
    this.data.selectAllOrder(this.newCustomer.cId).subscribe(
      result => {
        this.orderList = result["data"];
        for (let i = 0; i < this.orderList.length; i++) {
          if (this.orderList[i].oState == 1) {
            this.oNum1++;
          } else if (this.orderList[i].oState == 2) {
            this.oNum2++;
          } else if (this.orderList[i].oState == 3) {
            this.oNum3++;
          }
        }
      }
    )
  }

  initGoodsData() {
    this.data.getOrderGoodsList(this.newCustomer.cId).subscribe(
      result => {
        this.orderGoodsList = result["data"];
        this.orderGoodsList.forEach(element => {
          this.goodsData[element.order.oState-1].push(element.goods);
        });
      }
    )
  }

  setFavouriteNum() {
    this.data.selectFavoriteByCustomerId(this.newCustomer.cId).subscribe(
      result => {
        this.favoriteList = result["data"];
        this.fNum4 = this.favoriteList.length;
      }
    )
  }

  change(index){
    for (let i = 0; i < this.flag.length; i++) {
      this.flag[i] = false;
    }
    this.flag[index] = true;
    if(index != 0) {
      this.goods = this.goodsData[index-1];
    }
  }

}
