// Add your models here if you have any
export interface Order {
    orderId: number //order_id
    name: string
    email: string
    size: number
    sauce: string
    thickCruste: boolean //thick_crust
    toppings: any
    comments: string
}

export interface OrderSummary {
    orderId?: string
    name: string
    email: string
    amount: number
}

export interface Response {
    code: number
    message?: string
    data?: any
  }

