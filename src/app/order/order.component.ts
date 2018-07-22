import { Component, OnInit } from '@angular/core';
import { DataService } from '../data/data.service';
import { OrderGoods } from "../bean/orderGoods";
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  addressList: Object;
  status: Array<boolean>;
  orderGoodsList: Array<OrderGoods>;
  constructor(private data: DataService) { }
  count:number = 0
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
        for (let i = 0; i < result["data"].length; i++) {
          this.count++;
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
