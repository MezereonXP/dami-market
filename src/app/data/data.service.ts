import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../bean/user';
import { Shopcar} from '../bean/shopcar';

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

  getTopGoodsAdv(type) {
    const params = new HttpParams().set("type", type);
    return this.http.get("http://localhost:8080/api/getTopGoodsAdv", { params });
  }

  getgoodsPic(type) {
    const params = new HttpParams().set("type", type);
    return this.http.get("http://localhost:8080/api/getgoodsPic", { params });
  }

  getInfo() {
    return this.http.get("http://localhost:8080/api/newApi");
  }
  getShopGood() {
    return this.http.get("http://localhost:8080/api/getShopGood");
  }
  getShopGoodInfo(){
    return this.http.get("http://localhost:8080/api/getShopGoodInfo");
  }
  addGoodsToShopcar(shopcar: Shopcar) {
    return this.http.post("http://localhost:8800/api/addGoodsToShopcar", shopcar);
  }

}