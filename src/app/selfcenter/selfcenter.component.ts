import { Component, OnInit, TemplateRef } from '@angular/core';
import { DataService } from '../data/data.service';
import { Customer } from '../bean/customer';
import { Order } from '../bean/order';
import { Favorite } from '../bean/favorite';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Good } from '../bean/good';
import { OrderGoods } from '../bean/ordergoods';
import { OrderService } from '../data/order.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { Comment } from '../bean/comment';
@Component({
  selector: 'app-selfcenter',
  templateUrl: './selfcenter.component.html',
  styleUrls: ['./selfcenter.component.scss']
})
export class SelfcenterComponent implements OnInit {

  isLogin: boolean = false;
  phone: String;

  orderList: Array<Order>;
  favoriteList: Array<Favorite>;
  newCustomer: Customer = new Customer(1, null, null, 1, null, null, null, null, null, null, 1);

  orderGoodsList: Array<OrderGoods>;
  goods: Array<Good> = new Array<Good>();
  goodsData: Array<Array<Good>> = new Array<Array<Good>>();
  orderGoodsData: Array<Array<OrderGoods>> = new Array<Array<OrderGoods>>();
  unCommentGoodsData: Array<OrderGoods> = new Array<OrderGoods>();

  oNum1: number = 0;
  oNum2: number = 0;
  oNum3: number = 0;
  fNum4: number = 0;

  flag = [true, false, false, false, false];

  
  public options: Object = {
    placeholderText: '请输入评论内容',
    charCounterCount: false,
    imageUploadURL: '/upload_image'
  }

  modalRef: BsModalRef;
  editorContent: string;

  constructor(private data: DataService, private router: Router, private spinner: NgxSpinnerService,
                private orderService: OrderService, private modalService: BsModalService) { }

  ngOnInit() {
    this.spinner.show();
    this.initSpace();
    this.data.checklogin().subscribe(
      result => {
        this.phone = result["data"];
        this.isLogin = result["status"];
        if (this.isLogin) {
          this.data.getCustomerByPhone(this.phone).subscribe(
            result => {
              this.newCustomer = result["data"];
              this.initNum();
              this.setFavouriteNum();
              this.initGoodsData();
              this.spinner.hide();
            }
          );
        } else {
          this.router.navigate(["login"]);
        }
      }
    );
  }

  initSpace() {
    this.goodsData.push(new Array<Good>());
    this.goodsData.push(new Array<Good>());
    this.goodsData.push(new Array<Good>());
    this.orderGoodsData.push(new Array<OrderGoods>());
    this.orderGoodsData.push(new Array<OrderGoods>());
    this.orderGoodsData.push(new Array<OrderGoods>());
  }

  initNum() {
    this.data.selectAllOrder(this.newCustomer.cId).subscribe(
      result => {
        this.orderList = result["data"];
        for (let i = 0; i < this.orderList.length; i++) {
          if (this.orderList[i].oState == 1) {
            this.oNum1++;
          } else if (this.orderList[i].oState == 2) {
            this.oNum2++;
          }
        }
      }
    )
    this.data.getUnCommentOrderGoods(this.newCustomer.cId).subscribe(
      result => {
        this.oNum3 = result["data"].length;
        this.unCommentGoodsData = result["data"];
      }
    );

  }

  initGoodsData() {
    this.data.getOrderGoodsList(this.newCustomer.cId).subscribe(
      result => {
        this.orderGoodsList = result["data"];
        this.orderGoodsList.forEach(element => {
          this.goodsData[element.order.oState - 1].push(element.goods);
          this.orderGoodsData[element.order.oState - 1].push(element);
        });
      }
    )
  }

  setFavouriteNum() {
    this.data.selectFavoriteByCustomerId(this.newCustomer.cId).subscribe(
      result => {
        this.favoriteList = result["data"];
        this.fNum4 = this.favoriteList.length;
      }
    )
  }

  /**
   * 通过参数改变不同状态订单的显示
   * @param index 索引
   */
  change(index) {
    for (let i = 0; i < this.flag.length; i++) {
      this.flag[i] = false;
    }
    this.flag[index] = true;
    if (index != 0) {
      this.goods = this.goodsData[index - 1];
    }
  }

  /**
   * 确认收货
   * @param index 
   */
  accept(index) {
    this.spinner.show();
    this.orderGoodsData[1][index].ogStatus = 2;
    this.data.updateOrderGoods(this.orderGoodsData[1][index]).subscribe(
      result => {
        this.spinner.hide();
        window.alert("确认收货成功!");
        window.location.reload();
      }
    );
  }

  /**
   * 付款
   * @param index 
   */
  pay(index) {
    this.orderService.order = this.orderGoodsData[0][index].order;
    this.router.navigate(['settlement']);
  }

  public currentIndex;
  comment(template: TemplateRef<any>, index) {
    this.currentIndex = index;
    this.modalRef = this.modalService.show(template,
      Object.assign({}, { class: 'gray modal-lg' }));
  }

  upload() {
    this.spinner.show();
    let cm = new Comment();
    cm.cmDate = ""+new Date().getTime();
    cm.cmInfo = this.editorContent;
    cm.cmStatus = 0;
    cm.goods = this.unCommentGoodsData[this.currentIndex].goods;
    cm.order = this.unCommentGoodsData[this.currentIndex].order;
    this.data.addComment(cm).subscribe(
      result => {
        this.unCommentGoodsData[this.currentIndex].ogStatus = 3;
        this.data.updateOrderGoods(this.unCommentGoodsData[this.currentIndex]).subscribe(
          result => {
            this.spinner.hide();
            window.alert("评价成功!");
            window.location.reload();
          }
        );
      }
    );
  }

}
