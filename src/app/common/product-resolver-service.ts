import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductService } from './product-service';

@Injectable()
export class ProductsResolverService implements Resolve<Product[]> {
  constructor(private productService: ProductService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Product[] | Observable<Product[]> | Promise<Product[]> {
    const {queryParams: {category}} = route;
    const productMap = this.productService.getProducts();
    //@ts-ignore
    const products = productMap;
    if (!products?.length) {
      return this.productService.fetchHomeProducts();
    } else {
      return products;
    }
  }
}
