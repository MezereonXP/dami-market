import { Component, OnInit } from '@angular/core';
import { DataService } from '../data/data.service';
import { Customer } from '../bean/customer';
import { Order } from '../bean/order';
import { Favorite } from '../bean/favorite';

@Component({
  selector: 'app-selfcenter',
  templateUrl: './selfcenter.component.html',
  styleUrls: ['./selfcenter.component.scss']
})
export class SelfcenterComponent implements OnInit {

  orderList:Array<Order>;
  favoriteList:Array<Favorite>;
  newCustomer:Customer;

  oNum1:number=0;
  oNum2:number=0;
  oNum3:number=0;
  fNum4:number=0;
  constructor(private data:DataService) { }

  ngOnInit() {
    this.data.getCustomerById(1).subscribe(
      result => {

        console.log(result["data"]);
        this.newCustomer=result["data"];
        
      }
    )
    this.data.selectAllOrder(1).subscribe(
      result=>{
        this.orderList = result["data"];
        for(let i=0;i<this.orderList.length;i++){
          if(this.orderList[i].oState==1){
            this.oNum1++;
          }else if(this.orderList[i].oState==2){
            this.oNum2++;
          }else if(this.orderList[i].oState==3){
            this.oNum3++;
          }
        }
      }
    )
    this.data.selectFavoriteByCustomerId(1).subscribe(
      result=>{
        this.favoriteList = result["data"];
        this.fNum4 = this.favoriteList.length;
      }
    )


  }

}
