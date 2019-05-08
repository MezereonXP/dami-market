import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../bean/order';
import { DataService } from '../data/data.service';
import { OrderService } from '../data/order.service';


@Component({
  selector: 'app-settlement',
  templateUrl: './settlement.component.html',
  styleUrls: ['./settlement.component.scss']
})
export class SettlementComponent implements OnInit {

  order: Order;
  constructor(private data: DataService,private orderService: OrderService,
    private activatedRoute: ActivatedRoute,private router: Router) { }

  ngOnInit() {
    if(this.orderService.order!=null) {
      this.order = this.orderService.order;
    } else {
      window.alert("No order!");
    }
  }

  settlement() {
    let flag = confirm("确认付款？");
    if(flag){
      this.order.oState=2;
      this.data.updateOrder(this.order).subscribe(
        result => {
          if (this.orderService.tId!=null) {
            this.setTeamGood();
          } else {
            alert("付款成功！即将返回商城主页");
            this.router.navigate(['home']);
          }
        }
      );
      
    }
  }

  /**
   * 当属于团购的时候, 操作数据库
   */
  setTeamGood() {
    this.data.attendTeam(this.order.oId, this.orderService.tId).subscribe(
      result => {
        alert("付款成功！即将返回商城主页");
        this.router.navigate(['home']);
      }
    );
  }

}
