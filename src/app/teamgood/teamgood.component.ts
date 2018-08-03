import { Component, OnInit, Inject } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger, state } from '@angular/animations';
import { timer } from '../../../node_modules/rxjs';
import { DataService } from '../data/data.service';
import { Team } from '../bean/team';
import { Teamgoods } from '../bean/teamgoods';
import { TeamdisplayComponent } from '../teamdisplay/teamdisplay.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Route } from '../../../node_modules/@angular/compiler/src/core';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';
import { Order } from '../bean/order';
import { Customer } from '../bean/customer';
import { Address } from '../bean/address';
import { OrderGoods } from '../bean/ordergoods';
import { Good } from '../bean/good';

@Component({
  selector: 'app-teamgood',
  templateUrl: './teamgood.component.html',
  styleUrls: ['./teamgood.component.scss']
})
export class TeamgoodComponent implements OnInit {

  cId: number = 1;
  customer: Customer = new Customer(this.cId, null, null, 1, null, null, null, null, null, null, 1);
  Teams$: Team = new Team(1, 1, 1, true);
  TeamGood: Teamgoods = new Teamgoods(1, null, 1, 1, null, 1, 1, null);
  newAddress: Address = new Address(null, this.customer, null, null, null, null, 1);
  newOrder: Order = new Order(null, null, this.customer, this.newAddress, null, 2, null, null, 1);
  good: Good = new Good(null, null, null, null, null, null, null);
  orderGoods: OrderGoods = new OrderGoods(null, this.newOrder, this.good, this.TeamGood.nowPrice, 1, 1);
  orderGoodsList: Array<OrderGoods>
  constructor(private data: DataService, public dialog: MatDialog, public route: ActivatedRoute, private router: Router) { }

  phone = "";// 用户的手机号
  isLogin: boolean = false;// 是否登陆

  ngOnInit() {
    this.data.checklogin().subscribe(
      result => {
        this.phone = result["data"];
        this.isLogin = result["status"];
        if (this.isLogin) {
          this.init();
        }
      }
    );

  }

  /**
   * 初始化所有信息
   */
  init() {
    this.initCId();
    let tgId = this.route.snapshot.paramMap.get("tgId");
    this.data.getTeamGoodById(tgId).subscribe(
      result => {
        this.TeamGood = result["data"];
        console.log(this.TeamGood.name);
      });
    this.data.getTeamByTgId(tgId, this.cId).subscribe(
      result => {
        this.Teams$ = result["data"];
      });
    this.data.getGoodsByTgId(tgId).subscribe(
      result => {
        this.good = result["data"];
      });
  }

  initCId() {
    this.data.getCustomerByPhone(this.phone).subscribe(
      result => {
        this.cId = result["data"].cId;
      }
    )
  }

  sendOrderAndInsert() {
    this.orderGoodsList.push(this.orderGoods);
    let tgId = this.route.snapshot.paramMap.get("tgId");
    //生成团
    this.data.insertTeam(tgId, this.cId).subscribe();
    //递送order
    this.router.navigate(['order'], {
      queryParams: {
        orderGoodsList: JSON.stringify(this.orderGoodsList)
      }
    })
  }

  openDialog(tId) {
    let tgId = this.route.snapshot.paramMap.get("tgId");
    this.dialog.open(TeamdisplayComponent, {
      height: '350px',
      width: '500px',
      data: {
        newOrder: this.newOrder,
        tId: tId,
        tgId: tgId,
        cId: this.cId
      }
    });
  }
}
