import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { Customer } from '../bean/customer';
import { DataService } from '../data/data.service';

@Component({
  selector: 'app-regist2',
  templateUrl: './regist2.component.html',
  styleUrls: ['./regist2.component.scss']
})
export class Regist2Component implements OnInit {

  newCustomer:Customer
  constructor(private activatedRoute:ActivatedRoute,private data:DataService) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(
      queryParams => {
        this.newCustomer=JSON.parse(queryParams.newCustomer)
      }
    )
  }
  registnow(){
    console.log(this.newCustomer);
    this.data.register(this.newCustomer).subscribe();
    alert("注册成功！");
  }

}
