import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data/data.service';

@Component({
  selector: 'app-infomation',
  templateUrl: './infomation.component.html',
  styleUrls: ['./infomation.component.scss']
})
export class InfomationComponent implements OnInit {

  goodId: number;
  pics: Object;

  constructor(private data: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    // this.goodId = +this.route.snapshot.paramMap.get("id");
    // this.data.getGoodInfo(this.goodId).subscribe(
    //   result => this.pics = result["data"]
    // );
  }

}
