import { Component, OnInit } from '@angular/core';
import { DataService } from '../data/data.service';
import { ActivatedRoute } from '@angular/router';
import { Good } from '../bean/good';

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

  constructor(private data: DataService, private route: ActivatedRoute) { }

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
  }

  generateCatagories() {
    this.goods.forEach(element => {
      if(this.catagories.indexOf(element.gCatagory)==-1){
        this.catagories.push(element.gCatagory);
      }
    });
  }

  changeGoods(catagory: string) {
    this.goods = new Array<Good>();
    if(catagory == "全部") {
      this.goods = this.tempGoods;
    } else {
      this.tempGoods.forEach(element => {
        if(element.gCatagory == catagory) {
          this.goods.push(element);
        }
      });
    }
  }

}
