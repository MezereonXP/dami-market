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
  testTime=1531753200000;
  firstTime:string;
  secondTime:string;
  thirdTime:string;
  fourthTime:string;
  fifthTime:string;
  constructor() { }

  ngOnInit() {
    this.currentTime = new Date();
    while(new Date().getTime()>this.testTime){
      this.testTime=this.testTime+86400000;
    }
    this.time = (this.currentTime.getHours() + ":"
      + this.currentTime.getMinutes() + ":"
      + this.currentTime.getSeconds());
      this.getTime();
  }

  getTime() {
    
    let nTime = (this.testTime - new Date().getTime())/1000;
    let hour = Math.floor(nTime % 86400 / 3600);
    let minute = Math.floor(nTime % 86400 % 3600 / 60);
    let second = Math.floor(nTime % 86400 % 3600 % 60);
    if(hour>17){
      if(hour>18){
        this.firstTime="即将开始";
        this.secondTime="即将开始";
        this.thirdTime="即将开始";
        this.fourthTime="即将开始";
        this.fifthTime="即将开始";
      }else{
        hour=hour-17;
        this.time = "距开始还剩"+hour + ":"
        + minute + ":"
        + second;
        this.firstTime=this.time;
        this.secondTime="即将开始";
        this.thirdTime="即将开始";
        this.fourthTime="即将开始";
        this.fifthTime="即将开始";
      }

    }else if(hour>=13&&hour<17){
      if(hour>14){
        this.firstTime="已结束";
        this.secondTime="即将开始";
        this.thirdTime="即将开始";
        this.fourthTime="即将开始";
        this.fifthTime="即将开始";
      }else{
        hour=hour-13;
        this.time = "距开始还剩"+hour + ":"
        + minute + ":"
        + second;
        this.firstTime="已结束";
        this.secondTime=this.time;
        this.thirdTime="即将开始";
        this.fourthTime="即将开始";
        this.fifthTime="即将开始";
      }

    }else if(hour>=9&&hour<13){
      if(hour>10){
        this.firstTime="已结束";
        this.secondTime="已结束";
        this.thirdTime="即将开始";
        this.fourthTime="即将开始";
        this.fifthTime="即将开始";
      }else {
        hour=hour-9;
        this.time = "距开始还剩"+hour + ":"
        + minute + ":"
        + second;
        this.firstTime="已结束";
        this.secondTime="已结束";
        this.thirdTime=this.time;
        this.fourthTime="即将开始";
        this.fifthTime="即将开始";
      }

    }else if(hour>=5&&hour<9){
      if(hour>6){
        this.firstTime="已结束";
        this.secondTime="已结束";
        this.thirdTime="已结束";
        this.fourthTime="即将开始";
        this.fifthTime="即将开始";
      }else{
        hour=hour-5;
        this.time = "距开始还剩"+ hour + ":"
        + minute + ":"
        + second;
        this.firstTime="已结束";
        this.secondTime="已结束";
        this.thirdTime="已结束";
        this.fourthTime=this.time;
        this.fifthTime="即将开始";
      }

    }else if(hour>=1&&hour<5){
      if(hour>2){
        this.firstTime="已结束";
        this.secondTime="已结束";
        this.thirdTime="已结束";
        this.fourthTime="已结束";
        this.fifthTime="即将开始";
      }else{
        hour=hour-1;
        this.time = "距开始还剩"+ hour + ":"
        + minute + ":"
        + second;
        this.firstTime="已结束";
        this.secondTime="已结束";
        this.thirdTime="已结束";
        this.fourthTime="已结束";
        this.fifthTime=this.time;
      }

    }else if(hour<1){
      this.firstTime="已结束";
      this.secondTime="已结束";
      this.thirdTime="已结束";
      this.fourthTime="已结束";
      this.fifthTime="正在抢购";
    }

    setTimeout(() => {
      this.getTime();
    }, 500);
  }
  
  times=["6:00","10:00","14:00","18:00","22:00"];
  colors=["true","true","true","true","true"];
  clickTime(index){

  }

}
