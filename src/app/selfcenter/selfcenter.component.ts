import { Component, OnInit } from '@angular/core';
import { DataService } from '../data/data.service';
import { Customer } from '../bean/customer';

@Component({
  selector: 'app-selfcenter',
  templateUrl: './selfcenter.component.html',
  styleUrls: ['./selfcenter.component.scss']
})
export class SelfcenterComponent implements OnInit {

  newCustomer:Customer
  constructor(private data:DataService) { }

  ngOnInit() {
    this.data.getCustomerById(1).subscribe(
      result => {

        console.log(result["data"]);
        this.newCustomer=result["data"];
        
      }
    )
  }

}
