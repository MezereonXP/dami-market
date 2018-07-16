import { Component, OnInit } from '@angular/core';
import { timer } from '../../../node_modules/rxjs';

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
  constructor() { }

  ngOnInit() {
    this.currentTime = new Date();
    while (new Date().getTime() > this.testTime) {
      this.testTime = this.testTime + 86400000;
    }
    this.time = (this.currentTime.getHours() + ":"
      + this.currentTime.getMinutes() + ":"
      + this.currentTime.getSeconds());
    this.getTime();
  }

  times = ["6:00", "10:00", "14:00", "18:00", "22:00"];
  timeTipe = ["即将开始", "即将开始", "即将开始", "即将开始", "即将开始"]
  getTime() {

    let nTime = (this.testTime - new Date().getTime()) / 1000;
    let hour = Math.floor(nTime % 86400 / 3600);
    let minute = Math.floor(nTime % 86400 % 3600 / 60);
    let second = Math.floor(nTime % 86400 % 3600 % 60);
    let timeSlot = Math.floor(4 - hour / 4);
    if (timeSlot <= 0) {
      if (hour >= 16 && hour < 18) {
        this.timeTipe[0] = "距离开始还剩" + (hour - 16) + ":" + minute + ":" + second;
      }
    } else {
      for (let i = 0; i < timeSlot + 1; i++) {
        this.timeTipe[i] = "已结束";
      }

    }
    if (hour >= 12 && hour < 14) {
      this.timeTipe[1] = "距离开始还剩" + (hour - 12) + ":" + minute + ":" + second;
    }
    if (hour >= 8 && hour < 10) {
      this.timeTipe[2] = "距离开始还剩" + (hour - 8) + ":" + minute + ":" + second;
    }
    if (hour >= 4 && hour < 6) {
      this.timeTipe[3] = "距离开始还剩" + (hour - 4) + ":" + minute + ":" + second;
    }
    if (hour >= 0 && hour < 2) {
      this.timeTipe[4] = "距离开始还剩" + hour + ":" + minute + ":" + second;
    }

    setTimeout(() => {
      11
      this.getTime();
    }, 500);
  }


  clickTime(index) {

  }

}
