import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data/data.service';
import { Observable } from 'rxjs';
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

  phone="";
  pwd="";
  users$: Object;
  flag:boolean;
  constructor(private data: DataService, private route: ActivatedRoute) { }

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

  login(){

    this.data.login(this.phone,this.pwd).subscribe(
      result=>this.flag=result["status"]
    )
    if(this.flag){
      alert("登录成功");
    }
  }

}
