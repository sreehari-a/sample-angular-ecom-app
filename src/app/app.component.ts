import { Component } from '@angular/core';
import { LoaderService } from './common/loader-service';
import { ProductService } from './common/product-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'shopping-cart';
  categories: string[] = [];
  isLoading: boolean = false;
  constructor(private productService: ProductService, private loaderService: LoaderService) {}

  ngOnInit(): void {
    this.productService.categoriesChanged.subscribe((categories) => {
      this.categories = categories;
    });
    this.loaderService.loadStateChanged.subscribe(loading => {
      this.isLoading = loading;
    })
  }
}
