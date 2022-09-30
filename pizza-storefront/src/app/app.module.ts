import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { MainComponent } from './components/main.component';
import { OrdersComponent } from './components/orders.component';
import { PizzaService } from './pizza.service';

const routes: Routes = [
  {path: '', component: MainComponent },
  {path: "orders/", component: MainComponent }, //change
  {path: "orders/:email", component: OrdersComponent },
  {path: '**', redirectTo: '/', pathMatch: 'full' } //change
]

@NgModule({
  declarations: [
    AppComponent, MainComponent, OrdersComponent
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes) //useHash: true

  ],

  providers: [ PizzaService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
