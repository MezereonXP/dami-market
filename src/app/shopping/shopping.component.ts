import { Component, OnInit, TemplateRef} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data/data.service';
import { Good } from '../bean/good';
import { Config } from '../bean/config';
import { GoodImg } from '../bean/goodimg';
import { Shopping } from '../bean/shopping';
import { Shopcar } from '../bean/shopcar';
import { Customer } from '../bean/customer';
import { Favorite } from '../bean/favorite';
import { getOrSetAsInMap } from '@angular/animations/browser/src/render/shared';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Comment } from '../bean/comment';
import { Forum } from '../bean/forum';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})

export class ShoppingComponent implements OnInit {

  shopping: Shopping = new Shopping(new Good(1, 'waiting', 1, 'waiting', 1, 'waiting', 1), null, null);
  // goods: Good = new Good(0, "", 0, "", 0, "", 0,null);
  // config: Array<Config> = new Array<Config>();
  // goodimg: Array<GoodImg>;
  showPic = "http://www.hxbus.net/wiki/images/4/4e/%E6%9A%82%E6%97%A0%E5%9B%BE%E5%83%8F.jpg";
  shopcar: Shopcar;
  favorite: Favorite;
  customer: Customer;
  map: Map<number, Array<Config>> = new Map<number, Array<Config>>();
  customerShopcarList: Array<Shopcar>;
  favoriteList: Array<Favorite>;
  isshow = true;
  isshow1 = true;
  flag: boolean = true;
  isLogin: boolean = false;
  phone: string;

  comments: Array<Comment> = new Array<Comment>();
  latestComments: Array<Comment> = new Array<Comment>();
  isShowComment: boolean = false;//控制显示商品评论的布尔值
  panelOpenState: Array<boolean> = new Array<boolean>();
  forumArray :Array<Array<Forum>> = new Array<Array<Forum>>();
  modalRef: BsModalRef;
  content: string = "";// 回复的内容

  constructor(private data: DataService, private route: ActivatedRoute, private router: Router
    , private spinner: NgxSpinnerService, private modalService: BsModalService) { }

  ngOnInit() {
    this.spinner.show();// Begin the animation
    // this.shopping.goods.gId = +this.route.snapshot.paramMap.get("id");
    window.scrollTo(0, 0)
    let id = this.route.snapshot.paramMap.get("id");
    this.data.getShopGoodInfo(id).subscribe(
      result => {
        this.shopping = result["data"];
        console.log(this.shopping.goods.gId);
        // this.config = result["data"].config;
        this.showPic = this.shopping.goodimg[0][0].giImg;
        this.setMap();
        this.caninsert();
        this.checkLogin();
      }
    );
  }


  checkLogin() {
    this.data.checklogin().subscribe(
      result => {
        this.phone = result["data"];
        this.isLogin = result["status"];
        if (this.isLogin) {
          this.getCustomerAndInit();
        } else {
          //未登录
          this.router.navigate(["login"]);
        }
      }
    );
  }

  getCustomerAndInit() {
    this.data.getCustomerByPhone(this.phone).subscribe(
      result => {
        this.customer = result["data"];
        this.initShopCarGoods();
        this.initFavouriteGoods();
        this.initComment();
      }
    );
  }

  initComment() {
    this.data.getPopularCommentByGId(this.shopping.goods.gId).subscribe(
      result => {
        this.comments = result["data"];
        if(this.comments.length==0) {
          this.spinner.hide();// Hide the spinner
        }
        this.initForum();
      }
    );
    this.data.getCommentByGId(this.shopping.goods.gId).subscribe(
      reuslt => {
        this.latestComments = reuslt["data"];
      }
    )

  }

  //初始化评论
  initForum() {
    for (let i = 0; i < this.comments.length; i++) {
      const element = this.comments[i];
      this.panelOpenState.push(false);
      this.forumArray.push(new Array<Forum>());
      this.data.getForumByCMId(element.cmId).subscribe(
        result => {
          this.forumArray[i] = result["data"];
          this.spinner.hide();// Hide the spinner
        }
      )
    }
  }

  initFavouriteGoods() {
    this.data.selectFavoriteByCustomerId(this.customer.cId).subscribe(
      result => {
        this.favoriteList = result["data"];
        for (let i = 0; i < this.favoriteList.length; i++) {
          if (this.favoriteList[i].goods.gId == this.shopping.goods.gId) {
            this.flag = false;
            this.isshow1 = false;
          }
        }
      }
    );
  }

  initShopCarGoods() {
    this.data.getShopCarGoods(this.customer.cId).subscribe(
      result => {
        this.customerShopcarList = result["data"];
      }
    );
  }

  /**
   * 修改商品图片的显示
   * @param index 索引
   */
  changePic(index) {
    this.showPic = this.shopping.goodimg[index][0].giImg;
  }

  setMap() {
    this.shopping.config.forEach(element => {
      if (this.map.get(element.cfgType) != null) {
        this.map.get(element.cfgType).push(element);
      } else {
        this.map.set(element.cfgType, new Array<Config>());
        this.map.get(element.cfgType).push(element);
      }
    });
  }

  /**
   * 判断是否可以插入
   */
  caninsert() {
    if (this.shopping.goods.gStock > 0)
      this.isshow = true;
    else {
      this.isshow = false;
    }
  }

  /**
   * 加入购物车
   */
  addGoodsToShopcar() {

    let flag = true;
    for (let i = 0; i < this.customerShopcarList.length; i++) {
      if (this.customerShopcarList[i].goods.gId == this.shopping.goods.gId) {
        flag = false;
      }
    }
    if (flag) {

      this.shopcar = new Shopcar(null, this.customer, this.shopping.goods, 1, 1);
      this.data.addGoodsToShopcar(this.shopcar).subscribe();
      alert("加入成功");
      window.location.reload();
    } else {
      alert("购物车中已存在该商品");
    }
  }

  /**
   * 将商品加入喜欢
   */
  addGoodsToFavorite() {
    console.log("点击时" + this.flag);
    if (this.flag) {
      this.favorite = new Favorite(null, this.customer, this.shopping.goods, 1);
      this.data.addGoodsToFavorite(this.favorite).subscribe(
        result => {
          alert("已喜欢");
        }
      );
    } else {
      alert("喜欢列表中已存在该商品");
    }
    this.flag = false;
    this.isshow1 = false;
  }

  /**
   * 显示评论
   */
  goToComment() {
    this.isShowComment = true;
  }

  /**
   * 隐藏评论
   */
  goToShop() {
    this.isShowComment = false;
  }

  currentComment: Comment;
  startSending(comment, template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.currentComment = comment;
  }

  sendForum(template: BsModalRef) {
    template.hide();
    if (this.content=="") {
      window.alert("回复不能为空!");
    } else {
      this.spinner.show();
      let forum = new Forum();
      forum.fContent = this.content;
      forum.fDate = ""+new Date().getTime();
      forum.comment = this.currentComment;
      forum.customer = this.customer; 
      this.data.addForum(forum).subscribe(
        result => {
          this.spinner.hide();
          window.alert("回复成功!");
          window.location.reload();
        }
      );
    }
  }
}
