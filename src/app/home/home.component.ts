import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger, state } from '@angular/animations';
import { DataService } from '../data/data.service';
import { Good } from '../bean/good';
import { ShowBean } from '../bean/showbean';
import { Customer } from '../bean/customer';

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
  customer:Customer;
  isLogin:boolean = false;
  phone:String;
  isShowDetail = false;
  goodsList$: Array<Good>;
  showGoodsList$: Array<Good>;
  goodsImage2 = ["https://i1.mifile.cn/a4/xmad_15302595556283_DAjhs.jpg", "https://i1.mifile.cn/a4/xmad_15302597437612_vWwBm.jpg", "https://i1.mifile.cn/a4/xmad_15294897230285_fVNvp.png"];
  killandteam = ["https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532101915206&di=f6337f9599c69272fa6c668f9ead624a&imgtype=0&src=http%3A%2F%2Fimg.sccnn.com%2Fbimg%2F339%2F16545.jpg", "assets/team.png"]
  showBeans: Array<ShowBean>;
  isShowElevationNew: Array<Array<boolean>>;
  isShowElevationNew2: Array<Array<boolean>>;

  constructor(private data: DataService) { }
  /**
   * @memberof HomeComponent
   */
  //页面加载时初始化
  ngOnInit() {
    
    this.data.getGoodsList().subscribe(
      result => {
        this.goodsList$ = result["data"];
        console.log(this.goodsList$)
        // console.log(this.goodsList$[1][0].name);
      }
    );

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
          for (let j = 0; j < element.advPic.length; j++) {
            this.isShowElevationNew[i].push(true);
          }
        }
      }
    );
    //检查登录状态
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
    this.showGoodsList$ = new Array<Good>();
    for (let i = 0; i < this.goodsList$.length; i++) {
      if (this.goodsList$[i].gCatagory == this.items[index]) {
        this.showGoodsList$.push(this.goodsList$[i]);
      }
    }
    // window.alert(this.showGoodsList$[1].gName);
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
  // 跳转至闪购和团购页面
  jump(i) {
    if (i == 0) {
      location.href = "/#/kill"
    } else if (i == 1) {
      location.href = "/#/team"
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

  getRowHeight(flag) {
    return flag ? "2:5" : "1:5";
  }

}
