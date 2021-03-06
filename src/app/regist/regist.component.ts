import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from '../data/data.service';
import { User } from '../bean/user';
import { Customer } from '../bean/customer';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-regist',
  templateUrl: './regist.component.html',
  styleUrls: ['./regist.component.scss']
})
export class RegistComponent implements OnInit {

  newCustomer:Customer=new Customer(null,null,null,null,null,null,"中国",null,null,null,1);
  code: string = "";

  constructor(private data: DataService,private router:Router) { }

  ngOnInit() {
    
  }

  registtele(){
    this.newCustomer.cName = this.newCustomer.cTelephone;
    
    this.data.checkCode(this.newCustomer.cTelephone, this.code).subscribe(
      result => {
        if(result["status"]==true) {
          this.router.navigate(['regist2'],{
            queryParams:{
              newCustomer:JSON.stringify(this.newCustomer)
            }
          })
        } else {
          window.alert("验证码错误");
        }
      }
    );

  }

  send() {
    if(!(/^1[34578]\d{9}$/.test(this.newCustomer.cTelephone))){ 
      alert("手机号码有误，请重填");  
    } else {
      this.data.sendMessage(this.newCustomer.cTelephone).subscribe(
        result => {
          window.alert("已发送");
        }
      )
    }
  }
  

}
