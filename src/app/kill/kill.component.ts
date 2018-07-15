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

  constructor() { }

  ngOnInit() {
    this.currentTime = new Date();
    this.time = (this.currentTime.getHours() + ":"
      + this.currentTime.getMinutes() + ":"
      + this.currentTime.getSeconds());
    //this.getTime();
  }

  getTime() {
    let nTime = (1531663200000 - new Date().getTime())/1000;
    let hour = Math.floor(nTime % 86400 / 3600);
    let minute = Math.floor(nTime % 86400 % 3600 / 60);
    let second = Math.floor(nTime % 86400 % 3600 % 60);
    this.time = hour + ":"
      + minute + ":"
      + second;
    setTimeout(() => {
      this.getTime();
    }, 500);
  }

}
