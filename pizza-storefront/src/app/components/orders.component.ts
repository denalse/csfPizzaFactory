import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderSummary } from '../models';
import { PizzaService } from '../pizza.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})

export class OrdersComponent implements OnInit, AfterViewInit {

  orderList: OrderSummary[] = [];
  email = this.ar.snapshot.params['email'];

  // list: string[] = []
  // sub$!: Subscription

  constructor(private ar: ActivatedRoute, private router: Router, private pizzaSvc: PizzaService) { }
  
  ngOnInit(): void {
    this.showOrders(this.ar.snapshot.params['email']);
  }
  
  ngAfterViewInit(): void {
    this.showOrders(this.ar.snapshot.params['email']);
  }
  
  showOrders(email: string) {
      this.pizzaSvc.getOrders(email).subscribe((data: any) => {
        console.info(data);

        this.orderList = data as any;

        return this.orderList;
      })

  }

  goBack() {
    this.router.navigate(['/']);
  }
}
