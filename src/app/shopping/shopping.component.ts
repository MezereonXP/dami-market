import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data/data.service';
import { Good } from '../bean/good';
import { Config } from '../bean/config';
import { GoodImg } from '../bean/goodimg';
import { Shopping } from '../bean/shopping';
import { Shopcar } from '../bean/shopcar';
import { Customer } from '../bean/customer';
import { Favorite } from '../bean/favorite';
import { getOrSetAsInMap } from '@angular/animations/browser/src/render/shared';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent implements OnInit, AfterViewInit {

  shopping: Shopping = new Shopping(new Good(1, 'waiting', 1, 'waiting', 1, 'waiting', 1), null, null);
  // goods: Good = new Good(0, "", 0, "", 0, "", 0,null);
  // config: Array<Config> = new Array<Config>();
  // goodimg: Array<GoodImg>;
  showPic = "http://www.hxbus.net/wiki/images/4/4e/%E6%9A%82%E6%97%A0%E5%9B%BE%E5%83%8F.jpg";
  shopcar: Shopcar;
  favorite: Favorite;
  customer: Customer;
  map: Map<number, Array<Config>> = new Map<number, Array<Config>>();
  customerShopcarList: Array<Shopcar>;
  favoriteList: Array<Favorite>;
  isshow = true;
  isshow1 = true;
  flag: boolean = true;
  isLogin: boolean = false;
  phone: String;

  constructor(private data: DataService, private route: ActivatedRoute, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    // this.shopping.goods.gId = +this.route.snapshot.paramMap.get("id");
    window.scrollTo(0, 0)
    let id = this.route.snapshot.paramMap.get("id");
    this.data.getShopGoodInfo(id).subscribe(
      result => {
        this.shopping = result["data"];
        console.log(this.shopping.goods.gId);
        // this.config = result["data"].config;
        this.showPic = this.shopping.goodimg[0][0].giImg;
        this.setMap();
        this.caninsert();

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
                      this.customerShopcarList = result["data"];
                    }
                  );
                  this.data.selectFavoriteByCustomerId(this.customer.cId).subscribe(
                    result => {
                      this.favoriteList = result["data"];
                      console.log(this.favoriteList);
                      console.log(this.shopping.goods.gId);
                      for (let i = 0; i < this.favoriteList.length; i++) {
                        if (this.favoriteList[i].goods.gId == this.shopping.goods.gId) {
                          this.flag = false;
                          this.isshow1 = false;
                        }
                      }
                    }
                  );
                }
              );
            } else {
              //未登录
              this.router.navigate(["login"]);
            }
          }
        );
      }
    );

  }

  ngAfterViewInit() {
    this.spinner.hide();
  }

  changePic(index) {
    this.showPic = this.shopping.goodimg[index][0].giImg;
  }

  setMap() {
    this.shopping.config.forEach(element => {
      if (this.map.get(element.cfgType) != null) {
        this.map.get(element.cfgType).push(element);
      } else {
        this.map.set(element.cfgType, new Array<Config>());
        this.map.get(element.cfgType).push(element);
      }
    });
  }
  caninsert() {
    if (this.shopping.goods.gStock > 0)
      this.isshow = true;
    else {
      this.isshow = false;
    }
  }
  addGoodsToShopcar() {

    let flag = true;
    for (let i = 0; i < this.customerShopcarList.length; i++) {
      if (this.customerShopcarList[i].goods.gId == this.shopping.goods.gId) {
        flag = false;
      }
    }
    if (flag) {

      this.shopcar = new Shopcar(null, this.customer, this.shopping.goods, 1, 1);
      this.data.addGoodsToShopcar(this.shopcar).subscribe();
      alert("加入成功");
      window.location.reload();
    } else {
      alert("购物车中已存在该商品");
    }
  }
  addGoodsToFavorite() {
    console.log("点击时" + this.flag);
    if (this.flag) {
      this.favorite = new Favorite(null, this.customer, this.shopping.goods, 1);
      this.data.addGoodsToFavorite(this.favorite).subscribe(
        result => {
          alert("已喜欢");
        }
      );
    } else {
      alert("喜欢列表中已存在该商品");
    }
    this.flag = false;
    this.isshow1 = false;
  }
}
