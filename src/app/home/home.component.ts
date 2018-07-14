import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  items = ["手机 电话卡", "笔记本 平板", "健康 家居", "路由器 手机配件", "耳机 音箱"];
  goodsImages=["assets/goods-1.jpg","assets/goods-2.jpg"];

  constructor() { }

  ngOnInit() {
  }

}
