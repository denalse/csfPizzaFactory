import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

import { Order } from '../models';

const SIZES: string[] = [
  "Personal - 6 inches",
  "Regular - 9 inches",
  "Large - 12 inches",
  "Extra Large - 15 inches"
]

const PizzaToppings: string[] = [
    'chicken', 'seafood', 'beef', 'vegetables',
    'cheese', 'arugula', 'pineapple'
]

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  @Output()
  onNewOrder = new Subject<Order>()

  pizzaSize = SIZES[0]

  form!: FormGroup
  formArray!: FormArray

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.form = this.createForm()
    
  }

  updateSize(size: string) {
    this.pizzaSize = SIZES[parseInt(size)]
  }
  
  hasError(ctrlName: string) {
    return this.form.get(ctrlName)?.hasError('required')
  }

  createForm(): FormGroup {
    return this.fb.group ({
      name: this.fb.control<string>('', [ Validators.required ]),
      email: this.fb.control<string>('', [ Validators.required, Validators.email ]),
      size: this.fb.control<any>('', [ Validators.required ]),
      base: this.fb.control<string>('', [ Validators.required ]),
      sauce: this.fb.control<string>('', [ Validators.required ]),
      toppings: this.fb.control<string>('', [ Validators.required ]),
      comments: this.fb.control<string>('')
    })
  }

  processForm() {
    const placeOrder: Order = this.form.value as Order
    this.form = this.createForm()
    this.onNewOrder.next(placeOrder)
    console.info("button click", placeOrder)
  }


  



}
