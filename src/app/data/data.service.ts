import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../bean/user';
import { Shopcar } from '../bean/shopcar';
import { OrderGoods } from '../bean/ordergoods';
import { Address } from '../bean/address';

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
    return this.http.get("http://localhost:8080/api/getGoodsList");
  }

  getGoodInfo(goodId) {
    const params = new HttpParams().set("goodId", goodId);
    return this.http.get("http://localhost:8080/api/getGoodInfo", { params });
  }
  getAddress(userId) {
    const params = new HttpParams().set("userId", userId);
    return this.http.get("http://localhost:8800/api/selectAllAddressByCustomerId", {params});
  }
  getOrderGoodsList(userId) {
    const params = new HttpParams().set("userId", userId);
    return this.http.get("http://localhost:8800/api/selectAllOrderGoods", {params});
  }
  getAllOrder(userId) {
    const params = new HttpParams().set("userId", userId);
    return this.http.get("http://localhost:8800/api/selectAllOrder", {params});
  }
  killGoods(name) {
    const params = new HttpParams().set("id", name);
    return this.http.get("api/killGoods", {params});
  }

  getShopCarGoods(customerId) {
    const params = new HttpParams().set("customerId", customerId);
    return this.http.get("http://localhost:8800/api/getShopCarGoods", { params });
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
  addNewOrder(list:Array<OrderGoods>){
    return this.http.post("http://localhost:8800/api/addNewOrder", list);
  }
  addAddress(address:Address){
    return this.http.post("http://localhost:8800/api/addAddress", address);
  }
  modifyAddress(address:Address){
    return this.http.post("http://localhost:8800/api/modifyAddress", address);
  }
  deleteAddress(address:Address){
    return this.http.post("http://localhost:8800/api/deleteAddress", address);
  }

}