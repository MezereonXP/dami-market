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
import { OrderService } from '../data/order.service';

@Component({
  selector: 'app-teamgood',
  templateUrl: './teamgood.component.html',
  styleUrls: ['./teamgood.component.scss']
})
export class TeamgoodComponent implements OnInit {

  tId:number ;
  cId: number = 1;
  isHideButton=false;
  customer: Customer = new Customer(this.cId, null, null, 1, null, null, null, null, null, null, 1);
  Teams$: Array<Team> = new Array<Team>();
  TeamGood: Teamgoods = new Teamgoods(1, null, 1, 1, null, 1, 1, null);
  newAddress: Address = new Address(null, this.customer, null, null, null, null, 1);
  newOrder: Order = new Order(null, null, this.customer, this.newAddress, null, 2, null, null, 1);
  good: Good = new Good(null, null, null, null, null, null, null);
  orderGoods: OrderGoods = new OrderGoods(null, this.newOrder, this.good, this.TeamGood.nowPrice, 1, 1);
  orderGoodsList: Array<OrderGoods>
  constructor(private data: DataService, public dialog: MatDialog, private orderService: OrderService, public route: ActivatedRoute, private router: Router) { }

  phone = "";// 用户的手机号
  isLogin: boolean = false;// 是否登陆

  ngOnInit() {
    this.data.checklogin().subscribe(
      result => {
        this.phone = result["data"];
        this.isLogin = result["status"];
        if (this.isLogin) {
          this.initCId();
        }
      }
    );

  }

  /**
   * 初始化所有信息
   */
  init() {
    let tgId = this.route.snapshot.paramMap.get("tgId");
    this.data.getTeamGoodById(tgId).subscribe(
      result => {
        this.TeamGood = result["data"];
      });
    this.data.getTeamByTgId(tgId, this.cId).subscribe(
      result => {
        this.Teams$ = result["data"];
        if(Team[0].maxPeople==Team.length){
          this.isHideButton = true;
        }
      });
      this.data.getCustomerById(this.cId).subscribe(
        result => {
          this.orderGoods.order.customer = result["data"];
        }
      );
      this.data.getTeamGoodById(tgId).subscribe(
        result => {
          this.orderGoods.ogPrice = result["data"].nowPrice;
        });
      this.data.getGoodsByTgId(tgId).subscribe(
        result => {
          this.orderGoods.goods = result["data"];
        });
  }

  initCId() {
    this.data.getCustomerByPhone(this.phone).subscribe(
      result => {
        this.cId = result["data"].cId;
        this.init();
      }
    )
  }

  sendOrderAndInsert() {
    this.orderGoodsList.push(this.orderGoods);
    let tgId = this.route.snapshot.paramMap.get("tgId");
    //生成团
    this.data.insertTeam(tgId).subscribe(
      result => {
        this.tId = result["data"];
    });
    this.orderGoodsList.push(this.orderGoods);
    window.alert("参团成功");
    //递送order方法
    this.orderService.orderGoodsList = this.orderGoodsList;
    this.orderService.tId = this.tId;
    this.router.navigate(['order']);
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
