//主页商品展示实体类
import { Goods } from "./goods";

export class ShowBean {

  typeName: string;
  dividePic: string;
  advPic: Array<string>;
  isOneAdvPic: boolean;
  goods: Array<Goods>;

  constructor(name: string, dividePic: string, advPics: Array<string>, isOneAdvPic: boolean, goods: Array<Goods>) {
    this.typeName = name;
    this.dividePic = dividePic;
    this.advPic = advPics;
    this.isOneAdvPic = isOneAdvPic;
    this.goods = goods
  }

}