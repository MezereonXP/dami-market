import { Good } from "./good";

export class ShowBean {

  typeName: string;
  dividePic: string;
  advPic: Array<string>;
  isOneAdvPic: boolean;
  goods: Array<Good>;

  constructor(name: string, dividePic: string, advPic: Array<string>, isOneAdvPic: boolean, goods: Array<Good>) {
    this.typeName = name;
    this.dividePic = dividePic;
    this.advPic = advPic;
    this.isOneAdvPic = isOneAdvPic;
    this.goods = goods
  }

}