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

  customer:Customer=new Customer(null,null,null,null,null,null,"中国",null,null,null,1);
  constructor(private data: DataService,private router:Router) { }

  ngOnInit() {
  }

  changePW(){
    this.router.navigate(['reset'],{
      queryParams:{
        customer:JSON.stringify(this.customer)
      }
    })
  }

}
