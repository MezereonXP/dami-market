
export class Goods {

    gId: number;
    gName: string;
    gPrice: number;
    gCategory: string;
    gStock: number;
    gPictureurl: string;
    gStatus: number;
  
    constructor(gId: number, gName: string, gPrice: number, gCategory: string, gStock: number, gPictureurl: string, gStatus: number, ) {
      
      this.gCategory = gCategory;
      this.gId - gId;
      this.gName = gName;
      this.gPrice = gPrice;
      this.gPictureurl = gPictureurl;
      this.gStatus = gStatus;
      this.gStock = gStock;
  
    }
  }