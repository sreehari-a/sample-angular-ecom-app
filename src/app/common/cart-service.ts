import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem, Product } from '../models/product.model';

@Injectable()
export class CartService {
  cartUpdated = new Subject<CartItem[]>();
  totalAmountUpdated = new Subject<number>();
  private totalAmount = 0;
  private cart: CartItem[];
  constructor() {
    this.cart = [];
    this.cartUpdated.subscribe((cart) => {
      let totalAmt = 0;
      cart.map(({ quantity = 0, price }) => {
        totalAmt += quantity * price;
      });
      this.totalAmount = parseFloat(totalAmt.toFixed(2));
      this.totalAmountUpdated.next(this.totalAmount);
    });
  }
  getIndexOfProduct(id: number) {
    for (let index in this.cart) {
      const prod = this.cart[index];
      if (prod._id === id) {
        return Number(index);
      }
    }
    return -1;
  }
  addToCart(product: Product) {
    const arrayIndex = this.getIndexOfProduct(product?._id);
    const cartCopy = this.cart.slice();
    if (arrayIndex > -1) {
      const prod = this.cart[arrayIndex];
      cartCopy.splice(arrayIndex, 1, {
        ...prod,
        quantity: prod.quantity + 1,
      });
    } else {
      cartCopy.push({ ...product, quantity: 1 });
    }
    this.cart = cartCopy;
    this.cartUpdated.next(this.cart);
  }
  removeFromCart(product: Product, removeItem?: boolean) {
    const arrayIndex = this.getIndexOfProduct(product?._id);
    const cartCopy = this.cart.slice();
    if (arrayIndex >= -1) {
      const prod = cartCopy[arrayIndex];
      if (prod.quantity === 1 || removeItem) {
        cartCopy.splice(arrayIndex, 1);
      } else {
        cartCopy.splice(arrayIndex, 1, {
          ...prod,
          quantity: prod.quantity - 1,
        });
      }
      this.cart = cartCopy;
      this.cartUpdated.next(this.cart);
    }
  }
  getCart() {
    return this.cart;
  }
  getTotalAmt() {
    return this.totalAmount;
  }
}
