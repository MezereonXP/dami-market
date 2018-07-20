import { Component, OnInit } from '@angular/core';
import { DataService } from '../data/data.service';
import { forEach } from '@angular/router/src/utils/collection';
import { Shopcar } from '../../app/bean/shopcar';
@Component({
  selector: 'app-shopcar',
  templateUrl: './shopcar.component.html',
  styleUrls: ['./shopcar.component.scss']
})
export class ShopcarComponent implements OnInit {

  goods: Array<Shopcar>;
  isSelectAll = false;
  status: Array<boolean>;
  //quantity: Array<number>;
  count: number = 0;
  selectNum: number = 0;
  totalMoney: number = 0;
  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getShopCarGoods(1).subscribe(
      result => {
        this.status = new Array();
        //this.quantity = new Array();
        for (let i = 0; i < result["data"].length; i++) {
          this.status.push(false);

          this.count++;
        }
        this.goods = result["data"];
        // for (let i = 0; i < this.goods.length; i++){
        //   this.quantity.push(this.goods[i].count)
        // }
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

        this.totalMoney += this.goods[i].price * this.goods[i].count;
      }
    }
    this.changeQuantity(-1);


  }
  changeTatalMoney() {
    
    this.totalMoney = 0;
    for (let i = 0; i < this.count; i++) {
      if (this.status[i]) {
        this.totalMoney += this.goods[i].price * this.goods[i].count;
        
      }
    }

  }
  changeSelectAllStatus(i, item) {
    this.changeQuantity(i);
    if (!this.status[i]) {
      this.totalMoney += item.price * this.goods[i].count;
    } else {
      this.totalMoney -= item.price * this.goods[i].count;
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
