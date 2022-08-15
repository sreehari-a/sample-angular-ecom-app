import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/common/cart-service';
import { CartItem } from 'src/app/models/product.model';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent implements OnInit {
  @Input() cartItem?: CartItem;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {}
  setQuantity(event: Event) {
    if (this.cartItem) {
      //@ts-ignore
      switch (event?.target?.name) {
        case 'add':
          this.cartService.addToCart(this.cartItem);
          break;
        case 'sub':
          this.cartService.removeFromCart(this.cartItem);
          break;
        default:
          return;
      }
    }
  }
}
