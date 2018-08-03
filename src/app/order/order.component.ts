import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from '../data/data.service';
import { OrderGoods } from "../bean/ordergoods";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddressComponent } from "../address/address.component";
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from '../bean/address';
import { Customer } from '../bean/customer';
import { Order } from '../bean/order';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  customer: Customer;
  isLogin: boolean = false;
  phone: String;
  count: number = 0;
  address: Address;
  totalMoney: number = 0;
  addressList: Object;
  status: Array<boolean>;
  newOrder: Order;
  orderGoodsList: Array<OrderGoods>;
  constructor(private data: DataService, public dialog: MatDialog, private activatedRoute: ActivatedRoute, private router: Router,private spinner: NgxSpinnerService) {


  }

  ngOnInit() {
    this.spinner.show();
    
    this.data.checklogin().subscribe(
      result => {
        this.phone = result["data"];
        this.isLogin = result["status"];
        if (this.isLogin) {
          this.data.getCustomerByPhone(this.phone).subscribe(
            result => {
              this.customer = result["data"];
              this.data.getAddress(this.customer.cId).subscribe(
                result => {
                  this.status = new Array();
                  for (let i = 0; i < result["data"].length; i++) {
                    this.status.push(false);
                  }

                  this.status[0] = true;
                  this.addressList = result["data"];
                  this.address = this.addressList[0];
                  this.spinner.hide();
                }

              );
            }
          );
        } else {
          this.router.navigate(["login"]);
        }
      }
    );


    this.activatedRoute.queryParams.subscribe(

      queryParams => {


        console.log(queryParams.orderGoodsList);
        this.orderGoodsList = JSON.parse(queryParams.orderGoodsList);


      }

    );

    for (let i = 0; i < this.orderGoodsList.length; i++) {
      this.count++;
      this.totalMoney += this.orderGoodsList[i].ogPrice * this.orderGoodsList[i].ogQuantity;
    }


  }

  addNewOrder() {
    
    if(this.address!=null&&this.address!=undefined){
      for (let i = 0; i < this.orderGoodsList.length; i++) {
        this.orderGoodsList[i].order.address = this.address;
      }
      console.log(this.orderGoodsList);
      this.data.addNewOrder(this.orderGoodsList).subscribe(
        result => {
          this.newOrder = result["data"];
  
          this.router.navigate(['settlement'], {
            queryParams: {
              order: JSON.stringify(this.newOrder)
  
            }
          });
        }
      );
    }else{
      alert("请选择收货地址");
    }
    


  }

  selectAddress(i) {

    for (let n = 0; n < this.status.length; n++) {
      if (n != i) {
        this.status[n] = false;

      }
    }
    if(!this.status[i]){
      this.address = this.addressList[i];
    }else{
      this.address = null;
    }
    
  }
  openDialog() {
    const dialogRef = this.dialog.open(AddressComponent, {
      height: '350px',
      width: '500px',
      data: {
        newAddress: new Address(null, this.customer, null, null, null, null, 1),
        isAdd: true,
        isModify: false
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      window.location.reload();
    });
  }
  modifyAddress(i) {
    this.dialog.open(AddressComponent, {
      height: '350px',
      width: '500px',
      data: {
        newAddress: this.addressList[i],
        isAdd: false,
        isModify: true
      }
    });

  }


}
export interface DialogData {
  newAddress: Address;
  isAdd: boolean;
  isModify: boolean;
}
