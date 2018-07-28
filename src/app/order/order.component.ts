import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from '../data/data.service';
import { OrderGoods } from "../bean/orderGoods";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddressComponent } from "../address/address.component";
import { ActivatedRoute } from '@angular/router';
import { Address } from '../bean/address';
import { Customer } from '../bean/customer';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  count: number = 0;
  address: Address;
  totalMoney: number = 0;
  addressList: Object;
  status: Array<boolean>;
  orderGoodsList: Array<OrderGoods>;
  constructor(private data: DataService, public dialog: MatDialog, private activatedRoute: ActivatedRoute) {


  }

  ngOnInit() {
    this.data.getAddress(1).subscribe(
      result => {
        this.status = new Array();
        for (let i = 0; i < result["data"].length; i++) {
          this.status.push(false);
        }
        this.status[0] = true;
        this.addressList = result["data"];
      }

    );
    this.activatedRoute.queryParams.subscribe(

      queryParams => {
        let info = JSON.parse(queryParams.orderGoodsList);
        
       
        this.orderGoodsList = JSON.parse(queryParams.orderGoodsList);

        
      }

    );

    for (let i = 0; i < this.orderGoodsList.length; i++) {
      this.count++;
      this.totalMoney += this.orderGoodsList[i].goods.gPrice * this.orderGoodsList[i].ogQuantity;
    }


  }

  addNewOrder() {
    for (let i = 0; i < this.orderGoodsList.length; i++) {
      this.orderGoodsList[i].order.address = this.address;
    }
    console.log(this.orderGoodsList);
    this.data.addNewOrder(this.orderGoodsList).subscribe();
  }

  selectAddress(i) {

    for (let n = 0; n < this.status.length; n++) {
      if (n != i) {
        this.status[n] = false;
        
      }
    }
    this.address = this.addressList[i];
  }
  openDialog() {
    this.dialog.open(AddressComponent, {
      height: '350px',
      width: '500px',
      data:{newAddress:new Address(null,new Customer(1,null,null,null,null,null,null,null,null,null,null),null,null,null,null,1)}
    });
  }
  

}
export interface DialogData {
  newAddress:Address;
}
