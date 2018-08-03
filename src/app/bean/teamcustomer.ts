export class TeamCustomer {
    tcdId: number;
    customerName: string;
    constructor(tcdId: number,
        customerName: string) {
        this.tcdId = tcdId;
        this.customerName = customerName;
    }
}