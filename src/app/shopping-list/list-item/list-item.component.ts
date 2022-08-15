import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/common/cart-service';
import { ModalService } from 'src/app/components/modal';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css'],
})
export class ListItemComponent implements OnInit {
  //@ts-ignore
  @Input() product: Product;
  isAddedToCart: boolean = false;
  constructor(
    private modalService: ModalService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.isAddedToCart =
      this.cartService.getIndexOfProduct(this.product?._id || -9999) >= 0;
    this.cartService.cartUpdated.subscribe(() => {
      this.isAddedToCart =
        this.cartService.getIndexOfProduct(this.product?._id || -9999) >= 0;
      console.log('here', this.isAddedToCart);
    });
  }

  openModal(id: string = '') {
    this.modalService.open(id);
  }

  closeModal(id: string = '') {
    this.modalService.close(id);
  }

  addToCart(event: Event) {
    this.cartService.addToCart(this.product);
    event.stopPropagation();
  }
  removeFromCart(event: Event) {
    this.cartService.removeFromCart(this.product, true);
    event.stopPropagation();
  }
}
