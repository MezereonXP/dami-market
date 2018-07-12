import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  insertUser(user:User) {
    return this.http.post('http://localhost:8080/api/addUser', user);
  }
}