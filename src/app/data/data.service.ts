import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../bean/user';
import { Shopcar } from '../bean/shopcar';
import { Favorite } from '../bean/favorite';

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

  getInfo() {
    return this.http.get("http://localhost:8800/api/getAllGoods");
  }




  getShopGoodInfo(gId) {
    const params = new HttpParams().set("gId", gId);
    return this.http.get("http://localhost:8800/api/getShopGoodInfo", { params });
  }
  addGoodsToShopcar(shopcar: Shopcar) {
    return this.http.post("http://localhost:8800/api/addGoodsToShopcar", shopcar);
  }
  getShopCarGoods(customerId) {
    const params = new HttpParams().set("customerId", customerId);
    return this.http.get("http://localhost:8800/api/getShopCarGoods", { params });
  }

  addGoodsToFavorite(favorite: Favorite) {
    return this.http.post("http://localhost:8800/api/addGoodsToFavorite", favorite);
  }
  selectFavoriteByCustomerId(customerId){
    const params = new HttpParams().set("customerId", customerId);
    return this.http.get('http://localhost:8800/api/selectFavoriteByCustomerId' ,{params});
  }
  killGoods(name) {
    const params = new HttpParams().set("id", name);
    return this.http.get("api/killGoods", { params });
  }



}