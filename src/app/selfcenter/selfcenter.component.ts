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
import { UploaderBuilder,Uploader} from 'qiniu4js';
import { HttpClient } from '@angular/common/http';

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
  nameChangeFlag = true;
  areaChangeFlag = true;
  emailChangeFlag = true;

  tempUrl: string = "http://ol3p4szw6.bkt.clouddn.com/";
  url: string = "http://ol3p4szw6.bkt.clouddn.com/";

  isShowBtn: boolean = false;// 显示确认修改按钮

  public options: Object = {
    placeholderText: '请输入评论内容',
    charCounterCount: false,
    requestWithCORS: false,
    //图片上传配置(必须)
    imageUploadDomain: "http://ol3p4szw6.bkt.clouddn.com",    //七牛云存储空间域名地址
    imageUploadParam: 'file',
    imageUploadURL: '/api/upload',                            //七牛上传服务器, 如果是海外服务器为 http://up.qiniu.com
    imageUploadParams: { token: '<%= @uptoken %>' },                       //上传凭证, 详细规则查看七牛官方文档
    imageUploadMethod: 'POST',
    imageMaxSize: 5 * 1024 * 1024,
    imageAllowedTypes: ['jpeg', 'jpg', 'png'],
    imageManagerLoadURL: 'http://ol3p4szw6.bkt.clouddn.com',
    //文件上传配置(必须)
    fileUploadDomain: "http://ol3p4szw6.bkt.clouddn.com",     //七牛云存储空间域名地址
    fileUploadParam: 'file',
    fileUploadURL: '/api/upload',                             //同上
    fileUploadParams: { token: '<%= @uptoken %>'},                        //同上
    fileUploadMethod: 'POST',
    fileMaxSize: 20 * 1024 * 1024,
    fileAllowedTypes: ['*'],
    events : {
      'froalaEditor.image.uploaded': function (e, editor, response) {
        console.log(JSON.parse(response).key);
        let re = { 'link' : "http://ol3p4szw6.bkt.clouddn.com/" + JSON.parse(response).key }; 
        // response = '{ "link:" ' + JSON.parse(response).key + '}';
        response = re;
      },
      'froalaEditor.image.inserted': function (e, editor, $img, response) {
        console.log(response);
      },
      'froalaEditor.image.error': function (e, editor, error, response) {
        // Do something here.
        console.log(error);
      }
    }
  }

  modalRef: BsModalRef;
  editorContent: string;

  uploader: Uploader;

  constructor(private data: DataService, private router: Router, private spinner: NgxSpinnerService,
    private orderService: OrderService, private modalService: BsModalService, private http: HttpClient) { }

  ngOnInit() {
    this.spinner.show();
    this.initSpace();
    this.initUploader();
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

  initUploader() {
    let listener = {
      onReady(tasks) {},onStart(tasks){
        //所有内部图片任务处理后执行
        //开始上传
      },onTaskGetKey(task){
          //为每一个上传的文件指定key,如果不指定则由七牛服务器自行处理
        return new Date().getTime() + task.file.name;
      },onTaskProgress: function (task) {
          //每一个任务的上传进度,通过`task.progress`获取
        console.log(task.progress);
      },onTaskSuccess(task){
        //一个任务上传成功后回调
        console.log(task.key);//文件的key
      },onTaskFail(task) {
            //一个任务在经历重传后依然失败后回调此函数
      },onTaskRetry(task) {
            //开始重传    	
      },onFinish(tasks){
              //所有任务结束后回调，注意，结束不等于都成功，该函数会在所有HTTP上传请求响应后回调(包括重传请求)。
      }};
    this.uploader = new UploaderBuilder()
    .debug(false)//开启debug，默认false
    .retry(0)//设置重传次数，默认0，不重传
    .compress(0.5)//默认为1,范围0-1
    .scale([200,0])//第一个参数是宽度，第二个是高度,[200,0],限定高度，宽度等比缩放.[0,100]限定宽度,高度等比缩放.[200,100]固定长宽
    .size(1024*1024)//分片大小，最多为4MB,单位为字节,默认1MB
    .chunk(true)//是否分块上传，默认true，当chunk=true并且文件大于4MB才会进行分块上传
    .auto(true)//选中文件后立即上传，默认true
    .multiple(false)//是否支持多文件选中，默认true
    .accept(['.gif','.png','video/*','.jpg','.jpeg'])//过滤文件，默认无，详细配置见http://www.w3schools.com/tags/att_input_accept.asp
    .tokenShare(false)
    .tokenFunc(function (setToken,task) {
      setTimeout(function () {
        setToken("token");
      }, 1000);
    })
    .tokenUrl('/api/getSign')
    //任务拦截器
      .interceptor({
          //拦截任务,返回true，任务将会从任务队列中剔除，不会被上传
        onIntercept: function (task) {
          return task.file.size > 1024 * 1024;
        },
        //中断任务，返回true，任务队列将会在这里中断，不会执行上传操作。
        onInterrupt: function (task) {
          if (this.onIntercept(task)) {
            alert("请上传小于1m的文件");
            return true;
          }
          else {
            return false;
          }
        }
      })
    .listener(listener).build();
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

    if (this.orderService.flag != -1) {
      this.change(this.orderService.flag);
    }
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
    this.http.get("/api/getSign").subscribe(
      result => {
        this.options["imageUploadParams"].token = result["uptoken"];
        this.options["fileUploadParams"].token = result["uptoken"];
        this.modalRef = this.modalService.show(template,
          Object.assign({}, { class: 'gray modal-lg' }));
      }
    );

  }

  upload() {
    this.spinner.show();
    let cm = new Comment();
    cm.cmDate = "" + new Date().getTime();
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

  changeName() {
    this.nameChangeFlag = false;
  }

  changeEmail() {
    this.emailChangeFlag = false;
  }

  changeArea() {
    this.areaChangeFlag = false;
  }

  /**
   * 放弃修改, 重新加载customer数据
   */
  abort() {
    this.nameChangeFlag = true;
    this.emailChangeFlag = true;
    this.areaChangeFlag = true;
    this.spinner.show();
    this.data.getCustomerByPhone(this.phone).subscribe(
      result => {
        this.newCustomer = result["data"];
        this.spinner.hide();
      }
    );
  }

  update() {
    this.spinner.show();
    this.data.updateCustomer(this.newCustomer).subscribe(
      result => {
        this.abort();
      }
    );
  }

  showFileChoose() {
    this.uploader.chooseFile();
    this.uploader.listener.onStart = (task) => {
      this.spinner.show();
    }
    this.uploader.listener.onTaskSuccess = (task) =>{
      this.updateImg(task.key);
    } 
  }

  updateImg(url) {
    this.url = this.url + url;
    this.newCustomer.cPictureurl = this.url;
    this.data.updateCustomer(this.newCustomer).subscribe(
      result => {
        this.data.getCustomerByPhone(this.phone).subscribe(
          result => {
            this.newCustomer = result["data"];
            this.url = this.tempUrl;
            this.spinner.hide();
          }
        );
      }
    );
  }

}
