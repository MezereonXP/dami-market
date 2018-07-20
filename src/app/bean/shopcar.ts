export class Shopcar {

    id: number;
    pics: string;
    name: string;
    price: number;
    count: number;
    /**
     *
     */
    constructor(id: number, pics: string, name: string, price: number, count: number) {
        this.id = id;
        this.pics = pics;
        this.name = name;
        this.price = price;
        this.count = count;

    }

}