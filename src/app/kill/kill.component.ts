import { Component, OnInit } from '@angular/core';
import { timer } from '../../../node_modules/rxjs';
import { DataService } from '../data/data.service';
import { KillGoods } from '../bean/KillGoods'
import { MatDialog } from '../../../node_modules/@angular/material';
import { KilltipsComponent } from '../killtips/killtips.component';

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
  killGoodsList$: Array<KillGoods>;
  killGoods$: object;
  killId: string = "name";
  isCanKill = false;
  times = ["6:00", "10:00", "14:00", "18:00", "22:00"];
  timeTipe = ["即将开始", "即将开始", "即将开始", "即将开始", "即将开始"];
  isShowButtonList = [true, true, true, true, true];
  showPicList=[false, false, false, false, false];
  ifkillGoodOver: string;
  isShowButton: boolean;
  testMsg: object;

  constructor(private data: DataService, public dialog: MatDialog) { }

  ngOnInit() {
    //从service得到数据
    this.data.killGoods(this.killId).subscribe(
      result => {
        this.killGoods$ = result["data"];
        this.defaultShow();
      }
    ),

      this.currentTime = new Date();
    while (new Date().getTime() > this.testTime) {
      this.testTime = this.testTime + 86400000;
    }
    this.time = (this.currentTime.getHours() + ":"
      + this.currentTime.getMinutes() + ":"
      + this.currentTime.getSeconds());
    this.getTime();
  }

  initShowPicList(){
    for(let i=0;i<5;i++){
      this.showPicList[i]=false;
    }
  }

  defaultShow() {
    let nTime = (this.testTime - new Date().getTime()) / 1000;
    let hour = Math.floor(nTime % 86400 / 3600);
    let minute = Math.floor(nTime % 86400 % 3600 / 60);
    let second = Math.floor(nTime % 86400 % 3600 % 60);
    this.ifkillGoodOver = "立即抢购";
    if (nTime <= 0) {
      this.killGoodsList$ = this.killGoods$[5];
      this.isShowButton = this.isShowButtonList[4];
      this.initShowPicList();
      this.showPicList[4]=true;
    } else {
      if (hour >= 12) {
        this.killGoodsList$ = this.killGoods$[1];
        this.isShowButton=this.isShowButtonList[0];
        this.initShowPicList();
        this.showPicList[0]=true;
      } else {
        let index = 4 - Math.floor(hour / 4)
        this.killGoodsList$ = this.killGoods$[index];
        this.isShowButton = this.isShowButtonList[index - 1];
        this.initShowPicList();
        this.showPicList[index-1]=true;
      }
    }
  }

  getTime() {

    let nTime = (this.testTime - new Date().getTime()) / 1000;
    let hour = Math.floor(nTime % 86400 / 3600);
    let minute = Math.floor(nTime % 86400 % 3600 / 60);
    let second = Math.floor(nTime % 86400 % 3600 % 60);
    let timeSlot = 4 - Math.floor(hour / 4);
    if (timeSlot > 0) {
      for (let i = 0; i < timeSlot; i++) {
        this.timeTipe[i] = "正在抢购";
      }
    }
    let temp = 4 * Math.floor(hour / 4);
    if ((hour - temp) < 2) {
      let position = Math.floor(4 - temp / 4);
      this.timeTipe[position] = "距开始还剩" + (hour - temp) + ":" + minute + ":" + second;
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


  clickTime() {
    this.data.insertNote(1, "pingguo", 6).subscribe(
      result => {
        this.testMsg = result["data"];
        this.defaultShow();
      }
    )
  }

  showKillGood(index) {
    this.killGoodsList$ = this.killGoods$[index];
    this.ifkillGoodOver = "立即抢购";
    this.isShowButton = this.isShowButtonList[index - 1];
    this.initShowPicList();
    this.showPicList[index-1]=true;
  }

  kill() {
    this.data.killGoods(this.killId).subscribe(
      result => window.alert(result["msg"])
    );
  }

  openDialog() {
    this.dialog.open(KilltipsComponent, {
      height: '300px',
      width: '400px',
    });
  }

}
