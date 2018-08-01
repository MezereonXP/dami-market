import { Component } from '@angular/core';
import { Customer } from './bean/customer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  customer:Customer;
  isLogin:boolean = false;
  phone:String;

  ngOnInit() {
    
  }
}
