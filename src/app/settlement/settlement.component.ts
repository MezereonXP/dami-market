import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../bean/order';
import { DataService } from '../data/data.service';


@Component({
  selector: 'app-settlement',
  templateUrl: './settlement.component.html',
  styleUrls: ['./settlement.component.scss']
})
export class SettlementComponent implements OnInit {

  order: Order;
  constructor(private data: DataService,private activatedRoute: ActivatedRoute,private router: Router) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(

      queryParams => {
        this.order = JSON.parse(queryParams.order);
      }

    );
  }

  settlement() {
    
    let flag = confirm("真的交钱吗");
    if(flag){
      this.order.oState=2;
      this.data.updateOrder(this.order).subscribe();
      alert("交钱成功！即将进入商城主页");
      this.router.navigate(['home']);
    }
  }

}
