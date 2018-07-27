import { Component, OnInit } from '@angular/core';
import { DataService } from '../data/data.service';
import { Shopcar } from '../bean/shopcar';
import { Customer } from '../bean/customer';
import { Goods } from '../bean/goods';
@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent implements OnInit {

  shopcar:Shopcar;
  customer:Customer;
  goods:Goods;
  constructor(private data: DataService) { }

  ngOnInit() {
  }

  addGoodsToShopcar(){
    
    this.customer = new Customer(1,null,null,null,null,null,null,null,null,null,null);
    this.goods = new  Goods(4,null,null,null,null,null,null);
    this.shopcar = new Shopcar(null,this.customer,this.goods,5,1);
    this.data.addGoodsToShopcar(this.shopcar).subscribe();
    console.log("刷新");
  }
}
