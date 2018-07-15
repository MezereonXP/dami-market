export class Customer {
    cId: number;

    cPassword: string;

    cName: string;

    cSex: number;

    cBirthday: string;

    cTelephone: string;

    cArea: string;

    cBankcard: string;

    cEmail: string;

    cPictureurl: string;

    cStatus: number;


    constructor(cId: number, cPassword: string, cName: string, cSex: number, cBirthday: string,cTelephone: string,cArea: string,

        cBankcard: string,

        cEmail: string,

        cPictureurl: string,

        cStatus: number, ) {
            this.cId = cId;
            this.cPassword = cPassword;
            this.cName = cName;
            this.cSex = cSex;
            this.cBirthday = cBirthday;
            this.cTelephone = cTelephone;
            this.cArea = cArea;
            this.cBankcard = cBankcard;
            this.cEmail = cEmail;
            this.cPictureurl = cPictureurl;
            this.cStatus = cStatus;

    }

}
