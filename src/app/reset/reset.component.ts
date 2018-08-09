import { Component, OnInit } from '@angular/core';
import { Customer } from '../bean/customer';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { DataService } from '../data/data.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {

  customer:Customer
  constructor(private activatedRoute:ActivatedRoute,private data:DataService) { }

  pwd: string = '';
  pwd2: string = '';

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(
      queryParams => {
        this.customer=JSON.parse(queryParams.customer)
      }
    )
  }

  changenow(){
    if(this.pwd!=''&&this.pwd2!=''&&this.pwd==this.pwd2){
      this.customer.cPassword=this.pwd;
      this.data.reseter(this.customer).subscribe();
      alert("修改成功！");
      window.location.href = "/#/login";
    }else{
      alert("请确认密码一致!");
    }
  }
}
