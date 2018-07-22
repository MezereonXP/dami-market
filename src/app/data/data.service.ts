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

  insertUser(user:User) {
    return this.http.post('http://localhost:8080/api/addUser', user);
  }

  getGoodsList() {
    return this.http.get("http://localhost:8080/api/getGoodsList");
  }

  getGoodInfo(goodId) {
    const params = new HttpParams().set("goodId", goodId);
    return this.http.get("http://localhost:8080/api/getGoodInfo", {params});
  }
  getAddress(userId) {
    const params = new HttpParams().set("userId", userId);
    return this.http.get("http://localhost:8080/api/getAddress", {params});
  }
  getOrderGoodsList(userId) {
    const params = new HttpParams().set("userId", userId);
    return this.http.get("http://localhost:8080/api/getOrderGoodsList", {params});
  }
}