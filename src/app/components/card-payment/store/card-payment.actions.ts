import { Action } from '@ngrx/store'
import { CardPaymentRequest } from '../card-payment.model';

export const MAKE_PAYMENT = 'MAKE_PAYMENT';

export class MakePayment implements Action {
    readonly type = MAKE_PAYMENT;

    constructor(public payload: CardPaymentRequest){}
}