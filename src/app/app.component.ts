
import { Customer } from './bean/customer';
import { DataService } from './data/data.service';
import { Router } from '@angular/router';

import { Component, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { MatMenuTrigger } from "@angular/material/menu";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'app';
  customer: Customer = new Customer(1, "", "加载中", 1, "", "", "", "", "", "", 1);
  isLogin: boolean = false;
  phone: String;

  constructor(private data: DataService, private router: Router, private modalService: BsModalService) { }
  ngOnInit() {

    this.data.checklogin().subscribe(
      result => {
        this.phone = result["data"];
        this.isLogin = result["status"];
        if (this.isLogin) {

          this.data.getCustomerByPhone(this.phone).subscribe(
            result => {
              this.customer = result["data"];
            }
          );
        } else {
          //未登录
        }
      }
    );
  }

  logout() {
    this.data.logout().subscribe(
      result => {
        window.location.reload();
        this.router.navigate(["login"]);
      }
    );
  }

  jumpToSelfCenter() {
    this.router.navigate(["selfcenter"]);
  }

  searchContent = "";
  modalRef: BsModalRef;


  search(template: TemplateRef<any>) {

    if (this.searchContent == "") {
      this.modalRef = this.modalService.show(template);
    } else {
      console.log(this.searchContent);
      window.location.href = ("/#/search/" + this.searchContent);
      window.location.reload();
      
    }
  }
}
