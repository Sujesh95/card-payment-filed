export class CardPaymentRequest {
    public creditCardNumber: string;
    public cardHolder: string;
    public expirationDate: Date;
    public securityCode: string;
    public amount: number;

    constructor(creditCardNumber: string, cardHolder: string, expirationDate:string, securityCode:string, amount:string) {
        this.creditCardNumber = creditCardNumber;
        this.cardHolder = cardHolder;
        this.expirationDate = new Date(expirationDate);
        this.securityCode = securityCode;
        this.amount = +amount;
    }
}

export interface CardPaymentResponse {
    creditCardNumber: string;
    cardHolder: string;
    expirationDate: string;
    securityCode: string;
    amount: number;
}