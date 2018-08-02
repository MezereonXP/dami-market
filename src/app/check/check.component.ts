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
  constructor(private data: DataService,private router:Router) { }

  ngOnInit() {
  }

  changePW(){
    this.data.getCustomerByPhone(this.customer.cTelephone).subscribe(
      result=>{this.customer = result["data"]
      this.router.navigate(['reset'],{
        queryParams:{
          customer:JSON.stringify(this.customer)
        }
      })
    }
    );
    
  }

}
