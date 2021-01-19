import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PaymentService } from 'src/app/services/payment.service';
import { CardPaymentRequest, CardPaymentResponse } from './card-payment.model';
import { map, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as CardPaymentActions from './store/card-payment.actions';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-card-payment',
  templateUrl: './card-payment.component.html',
  styleUrls: ['./card-payment.component.css']
})
export class CardPaymentComponent implements OnInit, OnDestroy {

  constructor(private fb: FormBuilder,
    private paymentService: PaymentService,
    private store: Store<{payment : {paymentData: CardPaymentRequest, showPaymentDetails: boolean}}>) { }

  showToast: boolean = false;
  message: string;
  httpSubscription: Subscription;

  errorConfig = {
    creditCardNumber: {
      required: 'Enter Credit Card Number',
      pattern: 'Enter only numbers'
    },
    cardHolder: {
      required: 'Enter Card Holder Name',
      pattern: 'Enter only alphabets'
    },
    expirationDate: {
      required: 'Choose expiration Date'
    },
    securityCode: {
      minlength: 'Enter three digits',
    },
    amount: {
      required: 'Enter amount',
      pattern: 'Enter only numbers and shouldnt start with zero'
    }
  }

  errorObject = {
    creditCardNumber: '',
    cardHolder: '',
    expirationDate: '',
    securityCode: '',
    amount: ''
  }

  form = this.fb.group({
    creditCardNumber: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
    cardHolder: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
    expirationDate: ['', Validators.required],
    securityCode: ['', Validators.minLength(3)],
    amount: ['', [Validators.pattern(/^[1-9][0-9]*$/), Validators.required]]
  })

  ngOnInit() {
  }

  validateOnBlur(x: string) {
    const control = this.form.get(x);
    this.errorObject[x] = '';

    for (const y in control.errors) {
      const error = this.errorConfig[x][y];
      this.errorObject[x] = error;
    }
  }

  validateInputs() {
    for (const x in this.form.controls) {
      this.validateOnBlur(x);
    }

    if (new Date(this.form.get('expirationDate').value) < new Date()) {
      this.errorObject['expirationDate'] = 'Choose a future date';
      this.form.get('expirationDate').setErrors({DATE_ERR : true});
    }
  }


  closeToast(event) {
    this.showToast = event;
  }

  onSubmit() {
    this.validateInputs();
    if (this.form.invalid) return;

    const paymentData = new CardPaymentRequest(this.form.get('creditCardNumber').value,
      this.form.get('cardHolder').value,
      this.form.get('expirationDate').value,
      this.form.get('securityCode').value,
      this.form.get('amount').value)

    this.store.dispatch(new CardPaymentActions.MakePayment(paymentData));

    this.httpSubscription = this.paymentService.makePayment(paymentData)
      .pipe(map((data: CardPaymentResponse) => {
        data.expirationDate = new Date(data.expirationDate).toDateString();
        return data;
      }),
        tap(data => {
          console.log(data)
        }))
      .subscribe(data => {
        this.showToast = true;
        this.message = `Payment successfull for amount Rs.${data.amount}`;
      })
  }

  ngOnDestroy(){
    if(this.httpSubscription){
      this.httpSubscription.unsubscribe();
    }
  }

}
