import { Component, OnInit } from '@angular/core';
import { DataService } from '../data/data.service';
import { ArrayType } from '../../../node_modules/@angular/compiler/src/output/output_ast';
import { Note } from '../bean/Note';
import { NgxSpinnerService } from 'ngx-spinner';
import { Customer } from '../bean/customer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  customer: Customer;
  isLogin: boolean = false;
  phone: String;
  noteList: Array<Note>
  constructor(private data: DataService,private router:Router,private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      
      this.spinner.hide();
  }, 900);
    this.data.checklogin().subscribe(
      result=>{
        this.phone = result["data"];
        this.isLogin = result["status"];
        if(this.isLogin){
          
          this.data.getCustomerByPhone(this.phone).subscribe(
            result=>{
              this.customer = result["data"];
              this.data.selectNoteByCustomerId(this.customer.cId).subscribe(
                result => {
                  this.noteList = result["data"]
                }
              )
            }
          );
        }else{
          this.router.navigate(["login"]);
        }
      }
    );
    
  }

}
