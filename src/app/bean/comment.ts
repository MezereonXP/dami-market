import { Good } from "./good";
import { Order } from "./order";

export class Comment {
  public cmId: number;
  public goods: Good;
  public order: Order;
  public cmInfo: string;
  public cmDate: string;
  public cmStatus: number;
}