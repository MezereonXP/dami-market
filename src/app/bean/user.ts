export class User {

  id:number;
  name:string;
  password:string;
  sign:string;
  constructor(id:number, name:string, password:string, sign:string) {
    this.id = id;
    this.name = name;
    this.password = password;
    this.sign = sign;
  }

}