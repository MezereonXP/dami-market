import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data/data.service';
import { Observable } from 'rxjs';
import { Customer } from '../bean/customer';
/**
 * 登录模块
 *
 * @export
 * @class LoginComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  phone = "";
  pwd = "";
  users$: Object;
  flag: boolean;
  customer: Customer;
  constructor(private data: DataService, private router: Router) { }

  /**
   * Do while initing the login component
   *
   * @memberof LoginComponent
   */
  ngOnInit() {
    // window.alert(this.route.snapshot.paramMap.get("id"));
    this.data.getUsers().subscribe(
      data => this.users$ = data
    );
  }

  login() {
    console.log(this.phone, this.pwd);
    this.customer = new Customer(null, this.pwd, null, null, null, this.phone, "中国", null, null, null, 1);
    this.data.login(this.customer).subscribe(
      result => {
      this.flag = result["status"]
        console.log(result["status"]);
        if (this.flag) {
          //alert("登录成功");
          this.router.navigate(['home']);
        }else{
          alert("账号或密码错误");
        }
      }
    )

  }

}
