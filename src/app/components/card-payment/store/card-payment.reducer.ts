import { CardPaymentRequest } from "../card-payment.model";
import * as CardPaymentActions from './card-payment.actions';

const initialState = {
    paymentData : new CardPaymentRequest('', '', '', '', ''),
    showPaymentDetails: false
}

export function cardPaymentReducer (state = initialState, action: CardPaymentActions.MakePayment) {
    switch(action.type) {
        case CardPaymentActions.MAKE_PAYMENT:
            return {
                ...state,
                showPaymentDetails: true,
                paymentData: action.payload
            }

        default:
            return state;
    }
}