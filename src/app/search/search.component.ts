import { Component, OnInit } from '@angular/core';
import { DataService } from '../data/data.service';
import { ActivatedRoute } from '@angular/router';
import { Good } from '../bean/good';
import { Shopcar } from '../bean/shopcar';
import { Customer } from '../bean/customer';
import { Favorite } from '../bean/favorite';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  key: string = "";
  goods: Array<Good> = new Array<Good>();
  tempGoods: Array<Good> = new Array<Good>();
  catagories: Array<string> = new Array<string>();
  shopcar: Shopcar;
  favorite: Favorite;
  customer: Customer;
  customerShopcarList: Array<Shopcar>;
  favoriteList: Array<Favorite>;
  flag: Array<boolean> = new Array<boolean>();
  isshow1: Array<boolean> = new Array<boolean>();
  isLogin: boolean = false;
  phone: String;


  constructor(private data: DataService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.catagories.push("全部");
    this.key = this.route.snapshot.paramMap.get("key");
    this.data.search(this.key).subscribe(
      result => {
        this.goods = result["data"];
        this.tempGoods = result["data"];
        this.generateCatagories();
      }
    );
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
                  for (let j = 0; j < this.goods.length; j++) {
                    const element = this.goods[j];
                    this.flag.push(true);
                    this.isshow1.push(true);
                    for (let i = 0; i < this.favoriteList.length; i++) {
                      if (this.favoriteList[i].goods.gId == this.goods[j].gId) {
                        this.flag[j] = false;
                        this.isshow1[j] = false;
                        break;
                      }
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

  generateCatagories() {
    this.goods.forEach(element => {
      if (this.catagories.indexOf(element.gCatagory) == -1) {
        this.catagories.push(element.gCatagory);
      }
    });
  }

  changeGoods(catagory: string) {
    this.goods = new Array<Good>();
    if (catagory == "全部") {
      this.goods = this.tempGoods;
    } else {
      this.tempGoods.forEach(element => {
        if (element.gCatagory == catagory) {
          this.goods.push(element);
        }
      });
    }
  }
  addGoodsToShopcar(good: Good) {
    location.href = "/#/shopping/"+good.gId
    // let flag = true;
    // for (let j = 0; j < this.goods.length; j++) {
    //   const element = this.goods[j];
    //   for (let i = 0; i < this.customerShopcarList.length; i++) {
    //     if (this.customerShopcarList[i].goods.gId == this.goods[i].gId) {
    //       flag = false;
    //     }
    //   }
    // }
    // if (flag) {

    //   this.shopcar = new Shopcar(null, this.customer, good, 1, 1);
    //   this.data.addGoodsToShopcar(this.shopcar).subscribe();
    //   alert("加入成功");
    //   window.location.reload();
    // } else {
    //   alert("购物车中已存在该商品");
    // }
  }
  addGoodsToFavorite(good: Good, i:number) {
    console.log("点击时" + this.flag[i]);
    if (this.flag[i]) {
      this.favorite = new Favorite(null, this.customer, good, 1);
      this.data.addGoodsToFavorite(this.favorite).subscribe(
        result => {
          alert("已喜欢");
        }
      );
    } else {
      alert("喜欢列表中已存在该商品");
    }
    this.flag[i] = false; 
    this.isshow1[i] = false; 
  }

}
