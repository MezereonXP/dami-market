import { Component, OnInit } from '@angular/core';
import { DataService } from '../data/data.service';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  addressList: Object;
  
  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getAddress(1).subscribe(
      result => {
        this.addressList = result["data"];
      }
    );
  }

}
