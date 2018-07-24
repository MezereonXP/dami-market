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
  config: Config = new Config(0, 0, 0, 0, "", null);
  goodimg: GoodImg = new GoodImg(0, 0, "");


  constructor(private data: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    // this.id = +this.route.snapshot.paramMap.get("id");
    this.data.getShopGood().subscribe(
      result => this.goods = result["data"]
    );
    this.data.getShopGoodInfo().subscribe(

      result => this.config = result["data"].config[0]
    );

  }
}
