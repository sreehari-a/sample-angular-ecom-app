import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { CategoryResponse } from './data-storage-service';
import { ProductService } from './product-service';

@Injectable()
export class AppResolverService implements Resolve<CategoryResponse | string[]> {
  constructor(private productService: ProductService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): string[] | Observable<CategoryResponse> | Promise<CategoryResponse> {
    const categories: string[] = this.productService.getCategories();
    if (!categories.length) {
      return this.productService.fetchAllCategories();
    } else {
      return categories;
    }
  }
}
