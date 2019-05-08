import { Component, OnInit } from '@angular/core';
import { Customer } from '../bean/customer';
import { DataService } from '../data/data.service';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.scss']
})
export class CheckComponent implements OnInit {

  customer:Customer = new Customer(null,null,null,null,null,null,null,null,null,null,null);
  code: string = "";

  constructor(private data: DataService,private router:Router) { }

  ngOnInit() {
  }

  changePW(){
    this.data.checkCode(this.customer.cTelephone, this.code).subscribe(
      result => {
        if(result["status"]==true) {
          this.data.getCustomerByPhone(this.customer.cTelephone).subscribe(
            result=>{
              this.customer = result["data"]
              this.router.navigate(['reset'],{
                queryParams:{
                  customer:JSON.stringify(this.customer)
                }
              })
            }
          );
        } else {
          window.alert("验证码错误");
        }
      }
    );
  }

  send() {
    if(!(/^1[34578]\d{9}$/.test(this.customer.cTelephone))){ 
      alert("手机号码有误，请重填");  
    } else {
      this.data.sendMessage(this.customer.cTelephone).subscribe(
        result => {
          window.alert("已发送");
        }
      )
    }
  }

}
