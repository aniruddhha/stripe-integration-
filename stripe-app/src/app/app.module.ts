import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxStripeModule } from 'ngx-stripe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxStripeModule.forRoot('pk_test_51Hg7QJEAUKVCi0T14XviDRgLODAu1sltee8dlVEYLP3wuOnQdJe5BHT22MuSLUZruI7lC9465pJuTZj8MkD3XKli00jFGgewHE'),
    HttpClientModule,

    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
