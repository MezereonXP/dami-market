import { Component, OnInit } from '@angular/core';
import { DataService } from '../data/data.service';
import { ArrayType } from '../../../node_modules/@angular/compiler/src/output/output_ast';
import { Note } from '../bean/Note';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  noteList:Array<Note>
  constructor(private data:DataService) { }

  ngOnInit() {
    this.data.selectNoteByCustomerId(1).subscribe(
      result => {
        this.noteList=result["data"]
      }
    )
  }

}
