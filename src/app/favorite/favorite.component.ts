import { Component, OnInit } from '@angular/core';
import { DataService } from '../data/data.service';
import { ArrayType } from '../../../node_modules/@angular/compiler/src/output/output_ast';
import { Favorite } from '../bean/favorite';
import { Customer } from '../bean/customer';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {

  customer: Customer;
  isLogin: boolean = false;
  phone: String;
  favoriteList: Array<Favorite>
  constructor(private data: DataService,private router:Router,private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      
      this.spinner.hide();
  }, 900);
    this.data.checklogin().subscribe(
      result => {
        this.phone = result["data"];
        this.isLogin = result["status"];
        if (this.isLogin) {
          this.data.getCustomerByPhone(this.phone).subscribe(
            result => {
              this.customer = result["data"];
              this.data.selectFavoriteByCustomerId(this.customer.cId).subscribe(
                result => {
                  this.favoriteList = result["data"]
                }
              )
            }
          );
        } else {
          this.router.navigate(["login"]);
        }
      }
    );

  }
  deletenow(i) {
    this.data.deleteFavorite(this.favoriteList[i]).subscribe(
      result => {
        this.favoriteList = result["data"]
      }
    )
    window.location.reload();
  }

}
