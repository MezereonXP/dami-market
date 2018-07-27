import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data/data.service';
import { Good } from '../bean/good';
import { identifierModuleUrl } from '@angular/compiler';
import { Config } from '../bean/config';
import { GoodImg } from '../bean/goodimg';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent implements OnInit {

  goods: Good = new Good(0, "", "", 0, "", null);
  config: Array<Config> = new Array<Config>();
  goodimg: GoodImg = new GoodImg(0, 0, "");
  showPic = "http://www.hxbus.net/wiki/images/4/4e/%E6%9A%82%E6%97%A0%E5%9B%BE%E5%83%8F.jpg";


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
      }
    );
  }

  changePic(index) {
    this.showPic = this.config[index].goodimg[0].gi_img;
  }
}
