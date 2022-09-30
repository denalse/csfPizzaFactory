import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Order, OrderSummary } from '../models';
import { PizzaService } from '../pizza.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})

export class OrdersComponent implements OnInit {

  @Input()
  updatedOrder: OrderSummary[] = []

  orderList: OrderSummary[] = []
  
  // list: string[] = []
  email!: string
  sub$!: Subscription
  
  order!: OrderSummary

  constructor(private ar: ActivatedRoute, private title: Title,
    private pizzaSvc: PizzaService) { }
    
    ngOnInit(): void {
      if (this.ar.snapshot.params['email']) {
        this.email = this.ar.snapshot.params['email']
        this.sub$ = this.ar.params.subscribe(e => {
          console.info('>subscribe: ', e)
          // @ts-ignore
          this.email = e.email
        })
      }

      this.order = {
      email: '',
      orderId: '',
      name: '',
      amount: 0
    }

    // this.order = this.ar.snapshot.params['email'];
    // let email_ = this.ar.snapshot.params['email'] || 
    //   this.ar.snapshot.queryParams['email'];
    //   if(email_){
    //     this.email = email_;
    //   }


    console.log("\n>>>>> HIT")
    console.log(this.updatedOrder);
    this.orderList = this.updatedOrder;


    this.pizzaSvc.getOrders(this.email)
      .then(result => {
        console.info('>>>> book: ', result)
        this.order = result
      })
      .catch(error => {
        console.error('>>>> error: ', error)
      })
  }

}
