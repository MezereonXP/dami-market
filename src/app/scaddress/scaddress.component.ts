import { Component, OnInit } from '@angular/core';
import { DataService } from '../data/data.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Address } from '../bean/address';
import { AddressComponent } from "../address/address.component";
import { Customer } from '../bean/customer';
import { Router } from '@angular/router';
@Component({
  selector: 'app-scaddress',
  templateUrl: './scaddress.component.html',
  styleUrls: ['./scaddress.component.scss']
})
export class ScaddressComponent implements OnInit {

  customer:Customer;
  isLogin:boolean = false;
  phone:String;
  count: number = 0;
  address: Address;
  totalMoney: number = 0;
  addressList: Object;
  status: Array<boolean>;
  constructor(private data: DataService, public dialog: MatDialog,private router:Router) { }

  ngOnInit() {

    this.data.checklogin().subscribe(
      result=>{
        this.phone = result["data"];
        this.isLogin = result["status"];
        if(this.isLogin){
          this.data.getCustomerByPhone(this.phone).subscribe(
            result=>{
              this.customer = result["data"];
              this.data.getAddress(this.customer.cId).subscribe(
                result => {
                  this.status = new Array();
                  for (let i = 0; i < result["data"].length; i++) {
                    this.status.push(false);
                  }
                  this.status[0] = true;
                  this.addressList = result["data"];
                }
          
              );
            }
          );
        }else{
          this.router.navigate(["login"]);
        }
      }
    );

    
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
  deleteAddress(i) {
    this.data.deleteAddress(this.addressList[i]).subscribe();
    window.location.reload();
  }

}
export interface DialogData {
  newAddress: Address;
  isAdd: boolean;
  isModify: boolean;
}