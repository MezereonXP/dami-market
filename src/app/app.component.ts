import { Component, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  isLogin = true;
  searchContent = "";
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService) {}

  search(template: TemplateRef<any>) {
    if(this.searchContent == "") {
      this.modalRef = this.modalService.show(template);
    } else {
      window.location.replace("localhost/#/search/"+this.searchContent);
    }
  }
}
