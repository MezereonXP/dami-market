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

  user$: User;
  id: string;
  title: string;

  users$: Array<User>;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.id = "input value";
    this.title = "My title";
    this.user$ = new User(1, "loading", "loading", "loading");
    this.data.getAllUser().subscribe(
      result => this.users$ = result["data"]
    );
  }

  login() {
    this.data.getUser(this.id).subscribe(
      user => this.user$ = user["data"]
    );
  }

  check() {
    this.user$ = new User(null, "testName", "testPwd", "testSign");
    this.data.insertUser(this.user$).subscribe(
      result => window.alert(result["sign"])
    );
  }

}
