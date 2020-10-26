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

  stripeTest: FormGroup;
  secrete: string

  constructor(
    private fb: FormBuilder,
    private stripeService: StripeService,
    private http: CardHttpService
  ) { }

  ngOnInit(): void {
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      address: this.fb.group({
        city: '',
        country: '',
        line1: '',
        line2: '',
        state: ''
      })
    });

    this.http.paymentIntent().subscribe(res => this.secrete = res['clientSecret'])
  }

  pay() {
    this.stripeService.confirmCardPayment(this.secrete, {
      payment_method: {
        card: this.card.element,
        billing_details: {
          name: this.stripeTest.get('name').value,
          email: this.stripeTest.get('email').value,
          phone: this.stripeTest.get('phone').value,
          address: {
            city: '',
            country: '',
            line1: '',
            line2: '',
            state: ''
          }
        },
      },
      receipt_email: 'aniruddha.kudalkar@gmail.com',
      return_url: 'http://localhost:3000/returnUrl'
    }).subscribe(
      payRes => console.log(payRes)
    )
  }
}
