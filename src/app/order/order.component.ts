import { Component, OnInit } from '@angular/core';
import { DataService } from '../data/data.service';
import { OrderGoods } from "../bean/orderGoods";
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  count:number = 0;
  totalMoney:number = 0;
  addressList: Object;
  status: Array<boolean>;
  orderGoodsList: Array<OrderGoods>;
  constructor(private data: DataService) { }
  
  ngOnInit() {
    this.data.getAddress(1).subscribe(
      result => {
        this.status = new Array();
        for (let i = 0; i < result["data"].length; i++) {
          this.status.push(false);
        }
        this.addressList = result["data"];
      }

    );
    this.data.getOrderGoodsList(1).subscribe(
      result => {
        this.orderGoodsList = result["data"];
        for (let i = 0; i < this.orderGoodsList.length; i++) {
          this.count++;
          this.totalMoney+=this.orderGoodsList[i].price*this.orderGoodsList[i].quantity;
        }
      }
    )
  }

  selectAddress(i) {

    for (let n = 0; n < this.status.length; n++) {
      if (n != i) {
        this.status[n] = false;

      }
    }
  }

}
