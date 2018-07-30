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

  constructor(private data: DataService,private router:Router) { }

  ngOnInit() {
    
  }

  registtele(){
    this.router.navigate(['regist2'],{
      queryParams:{
        newCustomer:JSON.stringify(this.newCustomer)
      }
    })
  }
  

}
