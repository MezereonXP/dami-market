import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { DataService } from '../data/data.service';
import { MatDialog } from '@angular/material';
import { KilltipsComponent } from '../killtips/killtips.component';
import { killgood } from '../bean/killgood';
import { Goods } from '../bean/goods';
import { Customer } from '../bean/customer';
import { Router } from '@angular/router';

//弹窗信息的结构
export interface DialogData {
  kgId: number;
  goods: Goods;
  kgPrice: number;
  kgMsg: string;
  cId: number;
}

@Component({
  selector: 'app-kill',
  templateUrl: './kill.component.html',
  styleUrls: ['./kill.component.scss']
})
export class KillComponent implements OnInit {

  currentTime: Date;
  time: string;
  testTime = 1531749600000;
  firstTime: string;
  secondTime: string;
  thirdTime: string;
  fourthTime: string;
  fifthTime: string;
  killGoodsList$: Array<killgood>;
  flagKillGoodList$: Array<killgood>;
  killGoods$: Array<killgood>;
  killId: string = "name";
  isCanKill = false;
  times = ["6:00", "10:00", "14:00", "18:00", "22:00"];
  timeTipe = ["即将开始", "即将开始", "即将开始", "即将开始", "即将开始"];
  isShowButtonList = [true, true, true, true, true];
  showPicList = [false, false, false, false, false];
  isShowButton: boolean;
  noteMsg = "";
  noteflag: string;
  noteKgName: string;
  noteTime: number;
  ifQuantityOver = [true, true, true, true, true, true, true, true, true];
  ifKillGoodOver: string;
  returnMsg = "抢购成功";
  ifTimeOverList = [true, true, true, true, true];
  ifTimeOver = true;
  cId: number;
  killMsg: Object;
  customer:Customer;
  isLogin:boolean = false;
  phone:String;


  constructor(private data: DataService, public dialog: MatDialog,private router:Router) { }

  ngOnInit() {
    //从service得到数据
    this.data.getKillGoodInfo().subscribe(
      //后台得到的数据传给killGood$
      result => {
        this.killGoods$ = result["data"];
        this.defaultShow();
      }
    ),

      //保证时间在今天22点 并调用gettime定时器展示时间
      this.currentTime = new Date();
    while (new Date().getTime() > this.testTime) {
      this.testTime = this.testTime + 86400000;
    }
    this.time = (this.currentTime.getHours() + ":"
      + this.currentTime.getMinutes() + ":"
      + this.currentTime.getSeconds());
    this.getTime();

    this.data.checklogin().subscribe(
      result=>{
        this.phone = result["data"];
        this.isLogin = result["status"];
        if(this.isLogin){
          
          this.data.getCustomerByPhone(this.phone).subscribe(
            result=>{
              this.customer = result["data"];
            }
          );
        }else{
          //未登录
          this.router.navigate(["login"]);
        }
      }
    );
  }


  //后台得到数据传给killGood$
  refreshKillGoodList() {

    this.data.getKillGoodInfo().subscribe(
      //后台得到的数据传给killGood$
      result => {
        this.killGoods$ = result["data"];

      }
    )
  }

  //初始化三角图标
  initShowPicList() {
    for (let i = 0; i < 5; i++) {
      this.showPicList[i] = false;
    }
  }

  //初始killGoodList$（展示的list） 并根据条件展示
  selectKillGoods(index) {

    this.killGoodsList$ = new Array<killgood>();
    for (let i = 0; i < this.killGoods$.length; i++) {
      if ((this.killGoods$[i].kgTime - 2) / 4 == index) {
        this.killGoodsList$.push(this.killGoods$[i]);
      }
    }
  }

  //进入页面时默认展示的商品
  defaultShow() {
    let nTime = (this.testTime - new Date().getTime()) / 1000;
    let hour = Math.floor(nTime % 86400 / 3600);
    let minute = Math.floor(nTime % 86400 % 3600 / 60);
    let second = Math.floor(nTime % 86400 % 3600 % 60);
    this.ifKillGoodOver = "正在抢购";
    if (nTime <= 0) {
      this.selectKillGoods(5);
      this.isShowButton = this.isShowButtonList[4];
      this.initShowPicList();
      this.showPicList[4] = true;
      this.ifTimeOverFunction(3);
      this.ifTimeOver = this.ifTimeOverList[4];
      this.quantityOver();
    } else {
      if (hour >= 12) {
        this.selectKillGoods(1);
        this.isShowButton = this.isShowButtonList[0];
        this.initShowPicList();
        this.showPicList[0] = true;
        this.ifTimeOver = true;
        this.quantityOver();
      } else {
        let index = 4 - Math.floor(hour / 4)
        this.selectKillGoods(index);
        this.isShowButton = this.isShowButtonList[index - 1];
        this.initShowPicList();
        this.showPicList[index - 1] = true;;
        this.ifTimeOverFunction(index - 2);
        this.ifTimeOver = this.ifTimeOverList[index - 1];
        this.quantityOver();
      }
    }
  }

  //定时器记录时间
  getTime() {

    let nTime = (this.testTime - new Date().getTime()) / 1000;
    let hour = Math.floor(nTime % 86400 / 3600);
    let minute = Math.floor(nTime % 86400 % 3600 / 60);
    let second = Math.floor(nTime % 86400 % 3600 % 60);
    let timeSlot = 4 - Math.floor(hour / 4);
    if (timeSlot > 0) {
      for (let i = 0; i < timeSlot - 1; i++) {
        this.timeTipe[i] = "已结束";
      }
      this.timeTipe[timeSlot - 1] = "正在抢购";
    }

    let temp = 4 * Math.floor(hour / 4);
    if ((hour - temp) < 2) {
      let position = Math.floor(4 - temp / 4);
      this.timeTipe[position] = "距开始剩" + (hour - temp) + ":" + minute + ":" + second;
    }

    if (nTime >= 0) {
      for (let i = 4 - Math.floor(hour / 4); i <= 4; i++) {
        this.isShowButtonList[i] = false;
      }

    }

    if (second <= 10) {
      this.isCanKill = true;
    } else {
      this.isCanKill = false;
    }

    setTimeout(() => {
      this.getTime();
    }, 500);
  }


  //插入note
  insertNote(kgName) {
    this.noteKgName = kgName;
    for (let i = 0; i < 5; i++) {
      if (this.showPicList[i] == true) {
        this.noteTime = (i + 1) * 4 + 2;
      }
    }

    this.data.insertNote(1, this.noteKgName, this.noteTime, this.noteMsg).subscribe(
      result => {
        this.noteflag = result["msg"];

        if (this.noteflag == "true") {
          this.noteMsg = "success";
        } else {
          this.noteMsg = "over";
        }
      }
    )

    if (this.noteMsg == "") {

      window.alert("设置提醒成功");
    } else {
      window.alert("已经设置提醒");
    }

  }

  //判断货物是否售完
  quantityOver() {
    this.ifQuantityOver = new Array<boolean>();
    for (let i = 0; i < this.killGoodsList$.length; i++) {
      if (this.killGoodsList$[i].kgQuantity == 0) {
        this.ifQuantityOver[i] = false;
        this.ifKillGoodOver = "立即抢购";
      } else {
        this.ifQuantityOver[i] = true;
        this.ifKillGoodOver = "立即抢购";
      }
    }
  }


  //点击时间展示相应的商品
  showKillGood(index) {

    this.refreshKillGoodList();
    //展示对应时间的商品
    this.selectKillGoods(index);
    //判断货物是否售完
    this.quantityOver();
    //展示相应的按钮
    this.isShowButton = this.isShowButtonList[index - 1];
    //展示三角图标
    this.initShowPicList();
    this.showPicList[index - 1] = true;
    //判断那些抢购已经结束
    let nTime = (this.testTime - new Date().getTime()) / 1000;
    let hour = Math.floor(nTime % 86400 / 3600);
    let timeSlot = 4 - Math.floor(hour / 4);
    this.initIfTimeOverList();
    this.ifTimeOverFunction(timeSlot - 2);
    this.ifTimeOver = this.ifTimeOverList[index - 1];

  }


  kill() {
    this.data.killGoods(this.killId).subscribe(
      result => window.alert(result["msg"])
    );
  }

  //初始化ifTimeOverList
  initIfTimeOverList() {
    for (let i = 0; i < 5; i++) {
      this.ifTimeOverList[i] = true;
    }
  }

  //判断抢购是否结束并设置
  ifTimeOverFunction(index) {
    if (index >= 0) {
      for (let i = 0; i <= index; i++) {
        this.ifTimeOverList[i] = false;
      }
    }

  }

  //打开窗口
  openDialog(kgId, kgPrice, goods) {

    this.data.beginKillGood(kgId, this.customer.cId).subscribe(
      result => {
        this.returnMsg = result["msg"];
            //打开模态窗口并传值
    const dialogRef = this.dialog.open(KilltipsComponent, {
      height: '400px',
      width: '400px',
      data: { kgId: kgId, kgPrice: kgPrice, kgMsg: this.returnMsg, goods: goods, customer: this.customer }

    });

    //接收关闭窗口后传过来的值
    dialogRef.afterClosed().subscribe(result => {
      this.returnMsg = result.kgMsg;
      window.location.reload(true);
    });
      }
    );






  }
}
