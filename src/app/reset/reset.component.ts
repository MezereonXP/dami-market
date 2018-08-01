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

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(
      queryParams => {
        this.customer=JSON.parse(queryParams.customer)
      }
    )
  }

  changenow(){
    console.log(this.customer);
    this.data.reseter(this.customer).subscribe();
    alert("密码重置成功！");
  }
}
