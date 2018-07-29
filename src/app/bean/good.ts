

export class Good{
  gId:number;
  gName:string;
  gPrice: number;
  gCatagory:string;
  gStock:number;
  gPictureurl: string;
  gStatus:number;


  constructor(gId:number,gName:string, gPrice: number, gCatagory:string, gStock:number,gPictureurl: string,gStatus:number){
    this.gId = gId;
    this.gName = gName;
    this.gPrice = gPrice;
    this.gCatagory = gCatagory;
    this.gStock = gStock;
    this.gPictureurl = gPictureurl;
    this.gStatus = gStatus;
  }
}