// Implement the methods in PizzaService for Task 3
// Add appropriate parameter and return type 
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { Order, OrderSummary } from "./models";

const URL = '/api/order/{{ email }}'
 
@Injectable()
export class PizzaService {

  constructor(private http: HttpClient) { }

  // POST /api/order
  // Add any required parameters or return type
  createOrder(): Promise<Order[]> {
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')

    return firstValueFrom(
      this.http.post<Order[]>('/api/order', { headers })
    )
  }

  // GET /api/order/<email>/all
  // Add any required parameters or return type
  /* add any required parameters */
  getOrders(email: string): Promise<OrderSummary> {
    
    return firstValueFrom(
      this.http.get<OrderSummary>(`/api/order/{{email}}/all`)
      // this.http.get<Order>(URL, { order })
    )
  }

}
