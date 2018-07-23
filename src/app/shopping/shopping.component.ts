import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data/data.service';
import { Good } from '../bean/good';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent implements OnInit {
  
  goods : Good;


  constructor(private data: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    // this.id = +this.route.snapshot.paramMap.get("id");
    this.data.getShopGood().subscribe(
      result => this.goods = result["data"]
    
    );
  }
}
