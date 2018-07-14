import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger, state } from '@angular/animations';
import { DataService } from '../data/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('listStagger', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        animate(600, keyframes([
          style({ opacity: 0, transform: 'translateY(-100%)', offset: 0 }),
          style({ opacity: 1, transform: 'translateY(15px)', offset: 0.3 }),
          style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 })
        ]))
      ]),
      transition('* => void', [
        animate(600, keyframes([
          style({ opacity: 1, transform: 'translateY(0)', offset: 0 }),
          style({ opacity: 1, transform: 'translateY(-15px)', offset: 0.7 }),
          style({ opacity: 0, transform: 'translateY(100%)', offset: 1.0 })
        ]))
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {

  items = ["手机 电话卡", "笔记本 平板", "健康 家居", "路由器 手机配件", "耳机 音箱"];
  goodsImages = ["assets/goods-1.jpg", "assets/goods-2.jpg"];
  users$: Object;
  isShowDetail = false;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getUsers().subscribe(
      data => this.users$ = data
    );
  }

  /**
   * 展示鼠标悬停的商品种类的商品清单
   * @param index 
   */
  showDetail(index) {
    console.log(index);
    this.isShowDetail = true;
  }

  /**
   * 隐藏鼠标悬停的商品种类的商品清单
   */
  hideDetail() {
    this.isShowDetail = false;
  }

}
