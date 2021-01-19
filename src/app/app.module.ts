import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardPaymentComponent } from './components/card-payment/card-payment.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastComponent } from './components/toast/toast.component';
import { cardPaymentReducer } from './components/card-payment/store/card-payment.reducer';

@NgModule({
  declarations: [
    AppComponent,
    CardPaymentComponent,
    ToastComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({payment: cardPaymentReducer}),
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
