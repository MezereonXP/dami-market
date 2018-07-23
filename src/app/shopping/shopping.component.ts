import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data/data.service';
import { Good } from '../bean/good';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent implements OnInit {
  
  goods : Good = new Good(0, "", "",0,"");


  constructor(private data: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    // this.id = +this.route.snapshot.paramMap.get("id");
    this.data.getShopGood().subscribe(
      result => this.goods = result["data"]
    );
  }
}
