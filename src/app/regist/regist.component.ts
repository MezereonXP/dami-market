import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from '../data/data.service';
import { User } from '../bean/user';

@Component({
  selector: 'app-regist',
  templateUrl: './regist.component.html',
  styleUrls: ['./regist.component.scss']
})
export class RegistComponent implements OnInit {

  user$:User;
  id:string;
  title:string;

  constructor(private data:DataService) { }

  ngOnInit() {
    this.id = "input value";
    this.title = "My title";
    this.user$ = null;
  }

  login() {
    this.data.getUser(this.id).subscribe(
      user => this.user$ = user["data"]
    );
  }

  check() {
    window.alert(this.user$.name);
  }

}
