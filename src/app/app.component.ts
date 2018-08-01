import { Component } from '@angular/core';
import { Customer } from './bean/customer';
import { DataService } from './data/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  customer:Customer;
  isLogin:boolean = false;
  phone:String;

  constructor(private data: DataService,private router:Router) { }
  ngOnInit() {
    this.data.checklogin().subscribe(
      result=>{
        this.phone = result["data"];
        this.isLogin = result["status"];
        if(this.isLogin){
          
          this.data.getCustomerByPhone(this.phone).subscribe(
            result=>{
              this.customer = result["data"];
            }
          );
        }else{
          //未登录
        }
      }
    );
  }

  logout(){
    this.data.logout().subscribe();
    window.location.reload();
    this.router.navigate(["login"]);
  }

}
