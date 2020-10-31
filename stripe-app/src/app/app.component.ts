import { CardHttpService } from './http-service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { StripeService, StripeCardComponent } from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions
} from '@stripe/stripe-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild(StripeCardComponent) card: StripeCardComponent;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };

  custInfo: FormGroup;
  secrete: string

  constructor(
    private fb: FormBuilder,
    private stripeService: StripeService,
    private http: CardHttpService
  ) { }

  ngOnInit(): void {
    this.custInfo = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      couponCode: [],
      city: [''],
      currency: [''],
      country: [''],
      line1: [''],
      line2: [''],
      state: [''],
      zip: ['']
    });

    // this.http.paymentIntent().subscribe(res => this.secrete = res['clientSecret'])
  }

  saveBilling() {
    this.http.paymentIntent(this.custInfo.value).subscribe(res => this.secrete = res['clientSecret'])
  }

  checkout() {
    console.log('checkeed out')
    this.stripeService.confirmCardPayment(
      this.secrete, {
      payment_method: {
        card: this.card.element,
        billing_details: {
          name: this.custInfo.get('name').value,
          email: this.custInfo.get('email').value,
          phone: this.custInfo.get('phone').value,
          address: {
            city: this.custInfo.get('city').value,
            country: this.custInfo.get('country').value,
            line1: this.custInfo.get('line1').value,
            line2: this.custInfo.get('line2').value,
            state: this.custInfo.get('state').value
          }
        },
      },
      receipt_email: this.custInfo.get('email').value,
      return_url: 'http://localhost:3000/returnUrl'
    }).subscribe(
      payRes => console.log(payRes)
    )
  }
}



