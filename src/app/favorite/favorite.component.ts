import { Component, OnInit } from '@angular/core';
import { DataService } from '../data/data.service';
import { ArrayType } from '../../../node_modules/@angular/compiler/src/output/output_ast';
import { Favorite } from '../bean/favorite';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {

  favoriteList:Array<Favorite> = new Array<Favorite>();
  constructor(private data:DataService) { }

  ngOnInit() {
    this.data.selectFavoriteByCustomerId(1).subscribe(
      result => {
        this.favoriteList=result["data"]
      }
    )
  }
  deletenow(i){
    this.data.deleteFavorite(this.favoriteList[i]).subscribe(
      result => {
        this.favoriteList=result["data"]
      }
    )
    window.location.reload();
  }

}
