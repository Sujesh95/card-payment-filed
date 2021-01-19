import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CardPaymentResponse } from '../components/card-payment/card-payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  makePayment(data) {
    return this.http.post<CardPaymentResponse>('https://jsonplaceholder.typicode.com/posts', data);
  }
}
