import { Customer } from "./customer";
import { Comment } from "./comment";

export class Forum {
  public fId: number;
  public customer: Customer;
  public fDate: string;
  public comment: Comment;
  public fContent: string;
}