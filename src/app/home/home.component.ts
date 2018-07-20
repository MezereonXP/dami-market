import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger, state } from '@angular/animations';
import { DataService } from '../data/data.service';
import { TempGoods } from '../bean/temp.goods';
import { ShowBean } from '../bean/showbean';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('listStagger', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        animate(600, keyframes([
          style({ opacity: 0, transform: 'translateX(-100%)', offset: 0 }),
          style({ opacity: 0.7, transform: 'translateX(-10px)', offset: 0.3 }),
          style({ opacity: 1, transform: 'translateX(0)', offset: 1.0 })
        ]))
      ]),
      transition('* => void', [
        animate(100, keyframes([
          style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
          style({ opacity: 0.3, transform: 'translateX(10px)', offset: 0.7 }),
          style({ opacity: 0, transform: 'translateX(100%)', offset: 1.0 })
        ]))
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {

  items = ["手机", "笔记本平板", "智能家居", "配件", "耳机音箱"];
  goodsImages = ["assets/goods-1.jpg", "assets/goods-2.jpg", "assets/goods-3.jpg", "assets/goods-4.jpg"];
  slideColors = ["rgb(98,92,82)", "rgb(98,92,88)", "rgb(85,87,92)", "rgb(83,12,12)"];
  currentColor = "rgb(98,92,82)";
  currentSeeAllColor = "black";
  users$: Object;
  isShowDetail = false;
  goodsList$: Object;
  showGoodsList$: Array<TempGoods>;
  goodsImage2 = ["https://i1.mifile.cn/a4/xmad_15302595556283_DAjhs.jpg", "https://i1.mifile.cn/a4/xmad_15302597437612_vWwBm.jpg", "https://i1.mifile.cn/a4/xmad_15294897230285_fVNvp.png"];

  advPics: Object[] = [["", ""], ["", ""], ["", ""], ["", ""], ["", ""]];
  goodsPics: Object[] = [["", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", ""]];

  showBeans: Array<ShowBean>;

  isShowElevation = [[true, true], [true, true], [true, true], [true, true], [true, true]];
  isShowElevation2 = [[true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true],
  [true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true]];
  
  isShowElevationNew :Array<Array<boolean>>;
  isShowElevationNew2 :Array<Array<boolean>>;
  
  constructor(private data: DataService) { }
  /**
   *
   *
   * @memberof HomeComponent
   */
  ngOnInit() {
    this.data.getGoodsList().subscribe(
      result => {
        this.goodsList$ = result["data"];
        console.log(this.goodsList$["1"][0].name);
      }
    );
    for (let type = 1; type <= this.advPics.length; type++) {
      this.data.getTopGoodsAdv(type).subscribe(
        result => this.advPics[type - 1] = result[0]["pics"]
      );
    }
    for (let type = 1; type <= this.goodsPics.length; type++) {
      this.data.getgoodsPic(type).subscribe(
        result => this.goodsPics[type - 1] = result[0]["pics"]
      );
    }

    this.data.getInfo().subscribe(
      result => {
        this.showBeans = result["data"];
        this.isShowElevationNew = new Array();
        this.isShowElevationNew2 = new Array();
        for (let i = 0; i < this.showBeans.length; i++) {
          const element = this.showBeans[i];
          this.isShowElevationNew.push(new Array());
          this.isShowElevationNew2.push(new Array());
          for (let j = 0; j < element.goods.length; j++) {
              this.isShowElevationNew2[i].push(true);
          }
          for (let j = 0; j < element.advPics.length; j++) {
              this.isShowElevationNew[i].push(true);
          }
        }
      }
    );

  }

  /**
   * Object 转换成Map
   * @param obj 
   */
  objToStrMap(obj) {
    let strMap = new Map();
    for (let k of Object.keys(obj)) {
      strMap.set(k, obj[k]);
    }
    return strMap;
  }

  /**
   * 展示鼠标悬停的商品种类的商品清单
   * @param index 
   */
  showDetail(index) {
    this.isShowDetail = true;
    this.showGoodsList$ = this.goodsList$[index + 1];
  }

  /**
   * 隐藏鼠标悬停的商品种类的商品清单
   */
  hideDetail() {
    this.isShowDetail = false;
  }

  test(id) {
    window.alert(id);
  }

  log(event: number) {
    this.currentColor = this.slideColors[event];
    console.log(this.currentColor);
  }

  changeSeeAllColor(flag) {
    if (flag == 1) {
      this.currentSeeAllColor = "red";
    } else {
      this.currentSeeAllColor = "black";
    }
  }

  /**
   * 
   * @param type 代表商品的種類
   * @param flag 代表商品的特定id
   * @param isOver 代表鼠標是否在上方
   */
  setElevation(type, flag, isOver) {
    let temp = isOver == 1 ? false : true;
    this.isShowElevationNew[type].forEach(element => {
      element = true;
    });
    this.isShowElevationNew[type][flag] = temp;
  }
  setElevation2(type, flag, isOver) {
    let temp = isOver == 1 ? false : true;
    this.isShowElevationNew2[type].forEach(element => {
      element = true;
    });
    this.isShowElevationNew2[type][flag] = temp;
  }


  isShowUp(flag) {
    return flag ? '-5px' : '0px';
  }
  isShowUp2(flag) {
    return flag ? '-5px' : '0px';
  }

  getRowHeight(flag){
    return flag?"2:5":"1:5";
  }

}
