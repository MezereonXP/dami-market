import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '../../../node_modules/@angular/material';

@Component({
  selector: 'app-killtips',
  templateUrl: './killtips.component.html',
  styleUrls: ['./killtips.component.scss']
})
export class KilltipsComponent implements OnInit {

  msg="正在等待抢购结果。。。";
  isShowButton=true;

  constructor(public dialogRef:MatDialogRef<KilltipsComponent>,
  @Inject(MAT_DIALOG_DATA) public data:DialogData) { }

  ngOnInit() {
  }

}

export interface DialogData{

}