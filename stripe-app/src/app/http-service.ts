import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable(
    { providedIn: 'root' }
)
export class CardHttpService {

    constructor(
        private http: HttpClient
    ) {

    }
    paymentIntent(cust: {}): Observable<any> {
        return this.http.post('http://localhost:3000/create-payment-intent', cust)
    }
}