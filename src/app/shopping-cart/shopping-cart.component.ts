import { Component, OnInit } from '@angular/core';
import { CartService } from '../common/cart-service';
import { CartItem } from '../models/product.model';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  shoppingCart: CartItem[] = [];
  totalAmt: number;
  constructor(private cartService: CartService) {
    this.shoppingCart = cartService.getCart();
    this.totalAmt = cartService.getTotalAmt();
  }

  ngOnInit(): void {
    this.cartService.cartUpdated.subscribe((cart) => {
      this.shoppingCart = cart;
    });
    this.cartService.totalAmountUpdated.subscribe((total) => {
      this.totalAmt = total;
    });
  }
}
