import { Component, OnInit, Inject } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger, state } from '@angular/animations';
import { timer } from '../../../node_modules/rxjs';
import { DataService } from '../data/data.service';
import { Team } from '../bean/team';
import { Teamgoods } from '../bean/teamgoods';
import { TeamdisplayComponent } from '../teamdisplay/teamdisplay.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-teamgood',
  templateUrl: './teamgood.component.html',
  styleUrls: ['./teamgood.component.scss']
})
export class TeamgoodComponent implements OnInit {

  cId: number = 1;
  tgId: number = 1;
  Teams$: Team = new Team(1, 1, 1, true);
  TeamGood: Teamgoods = new Teamgoods(1, null, 1, 1, null, 1, 1, null);
  constructor(private data: DataService, public dialog: MatDialog) { }

  ngOnInit() {
    this.data.getTeamGoodById(this.tgId).subscribe(
      result => {
        this.TeamGood = result["data"];
        console.log(this.TeamGood.name);
      });
    this.data.getTeamByTgId(this.tgId, this.cId).subscribe(
      result => {
        this.Teams$ = result["data"];
      });
  }
  openDialog() {
    this.dialog.open(TeamdisplayComponent, {
      height: '350px',
      width: '500px',
    });
  }
}
