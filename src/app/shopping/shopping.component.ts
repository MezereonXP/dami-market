import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data/data.service';
import { Good } from '../bean/good';
import { identifierModuleUrl } from '@angular/compiler';
import { Config } from '../bean/config';
import { GoodImg } from '../bean/goodimg';
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

  goods: Good = new Good(0, "", 0, "", 0, "", 0);
  config: Array<Config> = new Array<Config>();
  goodimg: GoodImg = new GoodImg(0, 0, "");
  showPic = "http://www.hxbus.net/wiki/images/4/4e/%E6%9A%82%E6%97%A0%E5%9B%BE%E5%83%8F.jpg";
  shopcar: Shopcar;
  favorite: Favorite;
  customer: Customer;
  map: Map<number, Array<Config>> = new Map<number, Array<Config>>();

  constructor(private data: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    // this.id = +this.route.snapshot.paramMap.get("id");
    this.data.getShopGood().subscribe(
      result => this.goods = result["data"]
    );
    this.data.getShopGoodInfo().subscribe(
      result => {
        this.config = result["data"].config;
        this.showPic = this.config[0].goodimg[0].gi_img;
        this.setMap();
      }
    );
  }

  changePic(index) {
    this.showPic = this.config[index].goodimg[0].gi_img;
  }

  addGoodsToShopcar() {

    this.customer = new Customer(1, null, null, null, null, null, null, null, null, null, null);
    this.goods = new Good(4, null, null, null, null, null, null);
    this.shopcar = new Shopcar(null, this.customer, this.goods, 1, 1);
    this.data.addGoodsToShopcar(this.shopcar).subscribe();

  }
  addGoodsToFavorite() {
    this.customer = new Customer(1, null, null, null, null, null, null, null, null, null, null);
    this.goods = new Good(4, null, null, null, null, null, null);
    this.favorite = new Favorite(0, this.customer, this.goods, 1);
    this.data.addGoodsToFavorite(this.favorite).subscribe();
  }

  setMap() {
    this.config.forEach(element => {
      if(this.map.get(element.cfg_type)!=null){
        this.map.get(element.cfg_type).push(element);
      }else{
        this.map.set(element.cfg_type, new Array<Config>());
        this.map.get(element.cfg_type).push(element);
      }
    });
  }

}
