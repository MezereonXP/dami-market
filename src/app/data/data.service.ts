import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../bean/user';

/**
 * 数据访问接口定义
 *
 * @export
 * @class DataService
 */
@Injectable()
export class DataService {

  getRecommendGoods(arg0: any): any {
    throw new Error("Method not implemented.");
  }
  getShopCarGoods(arg0: any): any {
    throw new Error("Method not implemented.");
  }
  getTopGoodsAdv(arg0: any): any {
    throw new Error("Method not implemented.");
  }
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

  killGoods(name) {
    const params = new HttpParams().set("id", name);
    return this.http.get("http://localhost:8080/api/killGoods", { params });
  }
  
  getgoodsPic(type) {
    const params = new HttpParams().set("type", type);
    return this.http.get("http://localhost:8080/api/getgoodsPic", { params });
  }

  getInfo() {
    return this.http.get("http://localhost:8080/api/newApi");
  }

  insertNote(cId, kgName, time) {
    return this.http.get('http://localhost:8800/api/insertNote?cId=' + cId + "&kgName=" + kgName + "&time=" + time);
  }

  getKillGoodInfo(){
    return this.http.get("http://localhost:8800/api/selectKillGoods");
  }

  addKillGoodOrder(kgName){
    return this.http.get('http://localhost:8800/api/addKillGoodOrder?kgName='+kgName);
  }
}