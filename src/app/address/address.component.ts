import { Component, OnInit ,Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Address } from '../bean/address';
import { DataService } from '../data/data.service';
@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  newAddress:Address;
  constructor(public dialogRef: MatDialogRef<AddressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,private data2: DataService) { 
      this.newAddress = this.data.newAddress;
    }
    

  ngOnInit() {
  }

  addAddress(){
    console.log(this.newAddress);
    this.data2.addAddress(this.newAddress).subscribe();
    
    this.dialogRef.close();
  }
}

export interface DialogData {
  newAddress:Address;
}