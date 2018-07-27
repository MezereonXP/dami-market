import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../bean/user';
import { Shopcar } from '../bean/shopcar';
import { OrderGoods } from '../bean/ordergoods';

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

  getShopCarGoods(customerId) {
    const params = new HttpParams().set("customerId", customerId);
    return this.http.get("http://localhost:8800/api/getShopCarGoods", { params });
  }
  getRecommendGoods(goodsId) {
    const params = new HttpParams().set("goodsId", goodsId);
    return this.http.get("http://localhost:8080/api/getRecommendGoods", { params });
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
}