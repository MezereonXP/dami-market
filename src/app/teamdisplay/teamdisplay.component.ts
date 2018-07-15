import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from '../data/data.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TeamCustomer } from '../bean/teamcustomer';

@Component({
  selector: 'app-teamdisplay',
  templateUrl: './teamdisplay.component.html',
  styleUrls: ['./teamdisplay.component.scss']
})
export class TeamdisplayComponent implements OnInit {

  tId: number = 1;
  teamCustomer$ :TeamCustomer = new TeamCustomer(1,null);
  constructor(public dialogRef: MatDialogRef<TeamdisplayComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private data1: DataService) { }

  ngOnInit() {
    this.data1.getTeamByTId(this.tId).subscribe(
      result => {
        this.teamCustomer$ = result["data"];
        window.alert(this.teamCustomer$);
      }
    );
  }

}
export interface DialogData {
  animal: string;
  name: string;
}
