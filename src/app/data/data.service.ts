import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../bean/user';
import { Customer } from '../bean/customer';
import { Favorite } from '../bean/favorite';
import { Shopcar } from '../bean/shopcar';
import { OrderGoods } from '../bean/ordergoods';
import { Address } from '../bean/address';

import { Order } from '../bean/order';

/**
 * 数据访问接口定义
 *
 * @export
 * @class DataService
 */
@Injectable()
export class DataService {


  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get('https://jsonplaceholder.typicode.com/users')
  }

  getUser(id) {
    return this.http.get('http://localhost:8080/api/getUser?id=' + id);
  }

  getAllUser() {
    return this.http.get("http://localhost:8080/api/getAllUser")
  }

  insertUser(user: User) {
    return this.http.post('http://localhost:8080/api/addUser', user);
  }




  getGoodsList() {
    return this.http.get('http://localhost:8800/api/getGoodsList');
  }
  getgoodAdv() {
    return this.http.get("http://localhost:8800/api/getgoodAdv");
  }

  getGoodInfo(goodId) {
    const params = new HttpParams().set("goodId", goodId);
    return this.http.get("http://localhost:8080/api/getGoodInfo", { params });
  }
  getAddress(userId) {
    const params = new HttpParams().set("userId", userId);
    return this.http.get("http://localhost:8800/api/selectAllAddressByCustomerId", { params });
  }
  getOrderGoodsList(userId) {
    const params = new HttpParams().set("userId", userId);
    return this.http.get("http://localhost:8800/api/selectAllOrderGoods", { params });
  }
  getAllOrder(userId) {
    const params = new HttpParams().set("userId", userId);
    return this.http.get("http://localhost:8800/api/selectAllOrder", { params });
  }
  getInfo() {
    return this.http.get("http://localhost:8800/api/getAllGoods");
  }




  getShopGoodInfo(gId) {
    const params = new HttpParams().set("gId", gId);
    return this.http.get("http://localhost:8800/api/getShopGoodInfo", { params });
  }


  addGoodsToFavorite(favorite: Favorite) {
    return this.http.post("http://localhost:8800/api/addGoodsToFavorite", favorite);
  }

  killGoods(name) {
    const params = new HttpParams().set("id", name);
    return this.http.get("api/killGoods", { params });
  }
  register(customer: Customer) {
    return this.http.post('http://localhost:8800/api/regist', customer);
  }
  reseter(customer: Customer) {
    return this.http.post('http://localhost:8800/api/reset', customer);
  }

  getCustomerById(id) {
    const params = new HttpParams().set("customerId", id);
    return this.http.get('http://localhost:8800/api/selectCustomerById', { params });
  }
  selectFavoriteByCustomerId(customerId) {
    const params = new HttpParams().set("customerId", customerId);
    return this.http.get('http://localhost:8800/api/selectFavoriteByCustomerId', { params });
  }
  deleteFavorite(favorite: Favorite) {
    return this.http.post('http://localhost:8800/api/delete', favorite);
  }
  getShopCarGoods(customerId) {
    const params = new HttpParams().set("customerId", customerId);
    return this.http.get("http://localhost:8800/api/getShopCarGoods", { params });

  }

  getgoodsPic(type) {
    const params = new HttpParams().set("type", type);
    return this.http.get("http://localhost:8080/api/getgoodsPic", { params });
  }
  getRecommendGoods(customerId) {
    const params = new HttpParams().set("customerId", customerId);
    return this.http.get("http://localhost:8800/api/getRecommendGoods", { params });
  }
  editQuantityOfGoods(shopcar: Shopcar) {
    return this.http.post("http://localhost:8800/api/editQuantityOfGoods", shopcar);
  }
  deleteGoodsFromShopcar(shopcar: Shopcar) {
    return this.http.post("http://localhost:8800/api/deleteGoodsFromShopcar", shopcar);
  }
  addGoodsToShopcar(shopcar: Shopcar) {
    return this.http.post("http://localhost:8800/api/addGoodsToShopcar", shopcar);
  }
  addNewOrder(list: Array<OrderGoods>) {
    return this.http.post("http://localhost:8800/api/addNewOrder", list);
  }
  addAddress(address: Address) {
    return this.http.post("http://localhost:8800/api/addAddress", address);
  }
  modifyAddress(address: Address) {
    return this.http.post("http://localhost:8800/api/modifyAddress", address);
  }
  deleteAddress(address: Address) {
    return this.http.post("http://localhost:8800/api/deleteAddress", address);
  }
  updateOrder(order: Order) {
    return this.http.post("http://localhost:8800/api/updateOrder", order);
  }

  //连接后台 插入note
  insertNote(cId, kgName, time, kgMsg) {
    const params = new HttpParams().set("cId", cId).set("kgName", kgName).set("time", time).set("kgMsg", kgMsg);
    return this.http.get('http://localhost:8800/api/insertNote', { params });
  }

  //得到所有的秒杀商品
  getKillGoodInfo() {
    return this.http.get("http://localhost:8800/api/selectKillGoods");
  }

  //添加秒杀商品订单
  addKillGoodOrder(kgName) {
    const params = new HttpParams().set("kgName", kgName);
    return this.http.get('http://localhost:8800/api/addKillGoodOrder', { params });
  }

  //客户点击秒杀后开始秒杀
  beginKillGood(kgId, cId) {
    const params = new HttpParams().set("kgId", kgId).set("cId", cId);
    return this.http.get('http://localhost:8800/api/killGoods', { params });
  }
  selectNoteByCustomerId(customerId) {
    const params = new HttpParams().set("customerId", customerId);
    return this.http.get('http://localhost:8800/api/selectNoteByCustomerId', { params });
  }
  selectAllOrder(userId) {
    const params = new HttpParams().set("userId", userId);
    return this.http.get('http://localhost:8800/api/selectAllOrder', { params });
  }
  addFavorite(favorite: Favorite) {
    return this.http.post('http://localhost:8800/api/addFavorite', favorite);
  }
  login(newCustomer: Customer) {
    const params = new HttpParams().set("phone", newCustomer.cTelephone).set("pwd", newCustomer.cPassword);
    return this.http.get('http://localhost:8800/api/login', { params });
  }

  checklogin() {
    return this.http.get("http://localhost:8800/api/checklogin", { withCredentials: true });
  }

  getCustomerByPhone(phone) {
    const params = new HttpParams().set("phone", phone);
    return this.http.post('http://localhost:8800/api/getCustomerByPhone', { params });
  }
}