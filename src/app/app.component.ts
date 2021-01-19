import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CardPaymentRequest } from './components/card-payment/card-payment.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'card-payment';
  paymentDataSubscription : Subscription;
  paymentData: CardPaymentRequest[];
  showPayments = false;

  constructor(private store: Store<{payment: {paymentData: CardPaymentRequest, showPaymentDetails: boolean}}>){}


  ngOnInit() {
    this.paymentDataSubscription = this.store.select('payment').subscribe(data => {
      this.showPayments = data.showPaymentDetails;
      this.paymentData = this.convertObjectToArray(data.paymentData);
    });
  }

  splitCamelCase(string){
    return string.replace(/([a-z])([A-Z])/g, '$1 $2');
  }

  convertObjectToArray(obj){
    const newArr = [];
    for(const x in obj) {
      newArr.push({ key: x, value: obj[x]})
    }
    return newArr;
  }

  ngOnDestroy(){
    if(this.paymentDataSubscription){
      this.paymentDataSubscription.unsubscribe();
    }
  }
}
