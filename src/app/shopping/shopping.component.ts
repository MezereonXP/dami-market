import { Component, OnInit } from '@angular/core';
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


@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent implements OnInit {

  shopping: Shopping = new Shopping(new Good(1, 'waiting', 1, 'waiting', 1, 'waiting', 1), null, null);
  // goods: Good = new Good(0, "", 0, "", 0, "", 0,null);
  // config: Array<Config> = new Array<Config>();
  // goodimg: Array<GoodImg>;
  showPic = "http://www.hxbus.net/wiki/images/4/4e/%E6%9A%82%E6%97%A0%E5%9B%BE%E5%83%8F.jpg";
  shopcar: Shopcar;
  favorite: Favorite;
  customer: Customer;
  map: Map<number, Array<Config>> = new Map<number, Array<Config>>();

  constructor(private data: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    // this.shopping.goods.gId = +this.route.snapshot.paramMap.get("id");
    window.scrollTo(0, 0)
    let id = this.route.snapshot.paramMap.get("id");
    this.data.getShopGoodInfo(id).subscribe(
      result => {
        this.shopping = result["data"];
        // this.config = result["data"].config;
        this.showPic = this.shopping.goodimg[0][0].giImg;
        this.setMap();
      }
    );
  }

  changePic(index) {
    this.showPic = this.shopping.goodimg[index][0].giImg;
  }

  addGoodsToShopcar() {

    this.customer = new Customer(1, null, null, null, null, null, null, null, null, null, null);
    this.shopping.goods = new Good(4, null, null, null, null, null, null);
    this.shopcar = new Shopcar(null, this.customer, this.shopping.goods, 1, 1);
    this.data.addGoodsToShopcar(this.shopcar).subscribe();

  }
  addGoodsToFavorite() {
    this.customer = new Customer(1, null, null, null, null, null, null, null, null, null, null);
    this.shopping.goods = new Good(4, null, null, null, null, null, null);
    this.favorite = new Favorite(0, this.customer, this.shopping.goods, 1);
    this.data.addGoodsToFavorite(this.favorite).subscribe();
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

}
