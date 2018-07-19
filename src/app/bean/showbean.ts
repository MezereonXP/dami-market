import { Good } from "./good";

export class ShowBean {

  typeName: string;
  dividePic: string;
  advPics: Array<string>;
  isOneAdvPic: boolean;
  goods: Array<Good>;

  constructor(name: string, dividePic: string, advPics: Array<string>, isOneAdvPic: boolean, goods: Array<Good>) {
    this.typeName = name;
    this.dividePic = dividePic;
    this.advPics = advPics;
    this.isOneAdvPic = isOneAdvPic;
    this.goods = goods
  }

}