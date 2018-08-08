import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../bean/user';
import { Customer } from '../bean/customer';
import { Favorite } from '../bean/favorite';
import { Shopcar } from '../bean/shopcar';
import { OrderGoods } from '../bean/ordergoods';
import { Address } from '../bean/address';
import { Order } from '../bean/order';
import { Forum } from '../bean/forum';
import { Comment } from '../bean/comment';

/**
 * 数据访问接口定义
 *
 * @export
 * @class DataService
 */
@Injectable()
export class DataService {

  host = "";
  // host = "http://localhost:8800/";

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get('https://jsonplaceholder.typicode.com/users')
  }

  getUser(id) {
    return this.http.get(this.host + 'api/getUser?id=' + id);
  }

  getAllUser() {
    return this.http.get(this.host + "api/getAllUser")
  }

  insertUser(user: User) {
    return this.http.post(this.host + 'api/addUser', user);
  }

  //主页面

  //主页面菜单栏展示商品名称与缩略图
  getGoodsList() {
    return this.http.get(this.host + 'api/getGoodsList');
  }
  //主页面分类展示商品详细信息
  getInfo() {
    return this.http.get(this.host + "api/getAllGoods");
  }

  // 登录注册

  //注册
  register(customer: Customer) {
    return this.http.post(this.host + 'api/regist', customer);
  }
  //重置密码
  reseter(customer: Customer) {
    return this.http.post(this.host + 'api/reset', customer);
  }
  //登录
  login(newCustomer: Customer) {
    const params = new HttpParams().set("phone", newCustomer.cTelephone).set("pwd", newCustomer.cPassword);
    return this.http.get(this.host + 'api/login', { params, withCredentials: true });
  }
  //检查登录状态
  checklogin() {
    return this.http.get(this.host + "api/checklogin", { withCredentials: true });
  }
  //通过电话获取客户信息
  getCustomerByPhone(phone) {
    const params = new HttpParams().set("phone", phone);
    return this.http.get(this.host + 'api/getCustomerByPhone', { params });
  }
  //注销
  logout() {
    return this.http.get(this.host + "api/logout", { withCredentials: true });
  }


  //个人中心

  //展示个人信息
  getCustomerById(id) {
    const params = new HttpParams().set("customerId", id);
    return this.http.get(this.host + 'api/selectCustomerById', { params });
  }
  //查看喜欢的商品
  selectFavoriteByCustomerId(customerId) {
    const params = new HttpParams().set("customerId", customerId);
    return this.http.get(this.host + 'api/selectFavoriteByCustomerId', { params });
  }
  //删除喜欢的商品
  deleteFavorite(favorite: Favorite) {
    return this.http.post(this.host + 'api/delete', favorite);
  }
  //添加地址
  addAddress(address: Address) {
    return this.http.post(this.host + "api/addAddress", address);
  }
  //修改地址
  modifyAddress(address: Address) {
    return this.http.post(this.host + "api/modifyAddress", address);
  }
  //删除地址
  deleteAddress(address: Address) {
    return this.http.post(this.host + "api/deleteAddress", address);
  }
  //查看消息通知
  selectNoteByCustomerId(customerId) {
    const params = new HttpParams().set("customerId", customerId);
    return this.http.get(this.host + 'api/selectNoteByCustomerId', { params });
  }


  //购买页面

  //展示对应id的商品的详细信息
  getShopGoodInfo(gId) {
    const params = new HttpParams().set("gId", gId);
    return this.http.get(this.host + "api/getShopGoodInfo", { params });
  }
  //将商品加入喜欢列表
  addGoodsToFavorite(favorite: Favorite) {
    return this.http.post(this.host + "api/addFavorite", favorite);
  }
  //将商品加入购物车
  addGoodsToShopcar(shopcar: Shopcar) {
    return this.http.post(this.host + "api/addGoodsToShopcar", shopcar);
  }

  //获得收货地址
  getAddress(userId) {
    const params = new HttpParams().set("userId", userId);
    return this.http.get(this.host + "api/selectAllAddressByCustomerId", { params });
  }
  //获得购物车商品列表
  getOrderGoodsList(userId) {
    const params = new HttpParams().set("userId", userId);
    return this.http.get(this.host + "api/selectAllOrderGoods", { params });
  }
  //获得订单列表
  getAllOrder(userId) {
    const params = new HttpParams().set("userId", userId);
    return this.http.get(this.host + "api/selectAllOrder", { params });
  }
  //获得购物车中所有商品
  getShopCarGoods(customerId) {
    const params = new HttpParams().set("customerId", customerId);
    return this.http.get(this.host + "api/getShopCarGoods", { params });
  }
  //获得推荐商品
  getRecommendGoods(customerId) {
    const params = new HttpParams().set("customerId", customerId);
    return this.http.get(this.host + "api/getRecommendGoods", { params });
  }
  //修改购物车商品数量
  editQuantityOfGoods(shopcar: Shopcar) {
    return this.http.post(this.host + "api/editQuantityOfGoods", shopcar);
  }
  //从购物车中删除商品
  deleteGoodsFromShopcar(shopcar: Shopcar) {
    return this.http.post(this.host + "api/deleteGoodsFromShopcar", shopcar);
  }
  //创建新订单
  addNewOrder(list: Array<OrderGoods>) {
    return this.http.post(this.host + "api/addNewOrder", list);
  }
  //更改订单信息
  updateOrder(order: Order) {
    return this.http.post(this.host + "api/updateOrder", order);
  }
  //通过客户id查找所有订单
  selectAllOrder(userId) {
    const params = new HttpParams().set("userId", userId);
    return this.http.get(this.host + 'api/selectAllOrder', { params });
  }
  //连接后台 插入note
  insertNote(cId, kgName, time,killGoodDate,kgMsg) {
    const params = new HttpParams().set("cId", cId).set("kgName", kgName).set("time", time).set("kgMsg",kgMsg).set("killGoodDate",killGoodDate);
    return this.http.get(this.host + '/api/insertNote', { params });
  }
  //得到所有的秒杀商品
  getKillGoodInfo() {
    return this.http.get(this.host + "api/selectKillGoods");
  }
  //添加秒杀商品订单
  addKillGoodOrder(kgName) {
    const params = new HttpParams().set("kgName", kgName);
    return this.http.get(this.host + 'api/addKillGoodOrder', { params });
  }
  //客户点击秒杀后开始秒杀
  beginKillGood(kgId, cId) {
    const params = new HttpParams().set("kgId", kgId).set("cId", cId);
    return this.http.get(this.host + 'api/killGoods', { params });
  }


  // killGoods(name) {
  //   const params = new HttpParams().set("id", name);
  //   return this.http.get("api/killGoods", { params });
  // }
  // 
  // addFavorite(favorite: Favorite) {
  //   return this.http.post(this.host+'api/addFavorite', favorite);
  // }
  // //获得商品图片
  // getgoodsPic(type) {
  //   const params = new HttpParams().set("type", type);
  //   return this.http.get("http://localhost:8080/api/getgoodsPic", { params });
  // }

  search(key: string) {
    const params = new HttpParams().set("key", key);
    return this.http.get(this.host + "api/search", { params });
  }

  //根据商品id获得Team信息
  getTeamByTgId(tgId, cId) {
    const params = new HttpParams().set("tgId", tgId).set("cId", cId);
    return this.http.get(this.host + "api/getTeamByTgId", { params });
  }

  //获得某种类的全部商品
  getTeamGoods(catagory) {
    const params = new HttpParams().set("catagory", catagory);
    return this.http.get(this.host + "api/getTeamGoods", { params });
  }

  //获得全部团购商品
  getAllTeamGoods() {
    return this.http.get(this.host + "api/getAllTeamGoods");
  }

  //根据商品Id获得团购商品信息
  getTeamGoodById(tgId) {
    const params = new HttpParams().set("tgId", tgId);
    return this.http.get(this.host + 'api/getTeamGoodById', { params });
  }

  //根据团id获得团信息
  getTeamByTId(tId) {
    const params = new HttpParams().set("tId", tId);
    return this.http.get(this.host + 'api/getTeamByTId', { params });
  }
  //根据商品id获得货物信息
  getGoodsByTgId(tgId) {
    const params = new HttpParams().set("tgId", tgId);
    return this.http.get(this.host + 'api/getGoodsByTgId', { params });
  }
  //建立团
  insertTeam(tgId) {
    const params = new HttpParams().set("tgId", tgId);
    return this.http.get(this.host + 'api/insertTeam', { params });
  }
  //加入团
  attendTeam(oId, tId) {
    const params = new HttpParams().set("oId", oId).set("tId", tId);
    return this.http.get(this.host + 'api/attendTeam', { params });
  }
  //发送团购信息
  sendTeamNote(cId) {
    const params = new HttpParams().set("cId", cId);
    return this.http.get(this.host + 'api/sendTeamNote', { params });
  }
  getTopGoodsAdv(type) {
    const params = new HttpParams().set("type", type);
    return this.http.get(this.host + "api/getTopGoodsAdv", { params });
  }

  killGoods(name) {
    const params = new HttpParams().set("id", name);
    return this.http.get(this.host + "api/killGoods", { params });
  }

  /**
   * 通过商品ID获取评论, 评论按回复量进行排序
   * @param gId 
   */
  getPopularCommentByGId(gId) {
    const params = new HttpParams().set("gId", gId);
    return this.http.get(this.host + "api/getPopularComment", { params });
  }

  /**
   * 通过商品ID获取评论, 评论按时间进行排序
   * @param gId 商品ID
   */
  getCommentByGId(gId) {
    const params = new HttpParams().set("gId", gId);
    return this.http.get(this.host + "api/getComment", { params });
  }

  /**
   * 通过commentID来获取回复
   * @param cmId 
   */
  getForumByCMId(cmId) {
    const params = new HttpParams().set("cmId", cmId);
    return this.http.get(this.host + "api/getForum", { params });
  }

  /**
   * 插入评价的回复
   * @param forum 
   */
  addForum(forum:Forum) {
    return this.http.post(this.host + "api/addForum", forum)
  }

  /**
   * 获取没有评论的商品(已收货)
   * @param cId 客户ID
   */
  getUnCommentOrderGoods(cId) {
    const params = new HttpParams().set("cId", cId);
    return this.http.get(this.host + "api/getUnCommentOrderGoods", { params })
  }

  /**
   * 更新对应的orderGoods
   * @param orderGoods orderGoods对象
   */
  updateOrderGoods(orderGoods: OrderGoods) {
    return this.http.post(this.host + "api/updateOrderGoods", orderGoods);
  }

  /**
   * 插入评论
   * @param comment 评论
   */
  addComment(comment: Comment) {
    return this.http.post(this.host + "api/addComment", comment);
  }

  /**
   * 更新对应主键的customer记录
   * @param customer customer对象
   */
  updateCustomer(customer: Customer) {
    return this.http.post(this.host + "api/updateCustomer", customer);
  }

  /**
   * 发送短信验证码
   */
  sendMessage(phone: string){
    const params = new HttpParams().set("phone", phone);
    return this.http.get(this.host + "/api/sendMessage", { params });
  }

  /**
   * 验证验证码的正确
   * @param phone 手机号
   * @param code 验证码
   */
  checkCode(phone: string, code: string) {
    const params = new HttpParams().set("phone", phone).set('code', code);
    return this.http.get(this.host + "/api/checkCode", { params });
  }
}