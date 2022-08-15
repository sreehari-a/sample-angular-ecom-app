import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';
import { Product } from '../models/product.model';
import { DataStorageService } from './data-storage-service';
import { LoaderService } from './loader-service';

@Injectable()
export class ProductService {
  productsChanged = new Subject<any>();
  categoriesChanged = new Subject<string[]>();
  private productList: Product[] = [];
  private categories: string[] = [];
  private categoryMap: object = {};
  private filteredProducts: Product[] = [];
  constructor(
    private dataStorageService: DataStorageService,
    private loaderService: LoaderService
  ) {}
  setProductListDefault(products: Product[]) {
    this.setCategoryMap('default', products);
  }
  setCategories(categories: string[]) {
    this.categories = [...categories];
    this.categoriesChanged.next(this.categories);
  }
  setCategoryMap(category: string, products: Product[]) {
    this.categoryMap = { ...this.categoryMap, [category]: products };
    this.filteredProducts = products;
    this.productsChanged.next(this.filteredProducts);
  }
  setFilteredProducts(products: Product[]) {
    this.filteredProducts = products;
  }
  filterProducts(filter: any) {
    this.loaderService.setLoader(true);
    return this.dataStorageService.fetchProductsFiltered(filter).pipe(
      tap((productResponse) => {
        this.setProductListDefault(productResponse.data);
        this.loaderService.setLoader(false);
      })
    );
  }
  fetchHomeProducts() {
    this.loaderService.setLoader(true);
    return this.dataStorageService.fetchAllproducts().pipe(
      tap((products: Product[]) => {
        this.setProductListDefault(products);
        this.loaderService.setLoader(false);
      })
    );
  }
  fetchAllCategories() {
    this.loaderService.setLoader(true);
    return this.dataStorageService.fetchAllCategories().pipe(
      tap((categoryResponse) => {
        const categories = categoryResponse.data.map(
          (entry) => entry.name
        );
        this.setCategories(categories);
        this.loaderService.setLoader(false);
      })
    );
  }
  fetchProductsOfCategory(category: string) {
    this.loaderService.setLoader(true);
    return this.dataStorageService.fetchProductsOfCategory(category).pipe(
      tap((productResponse) => {
        this.loaderService.setLoader(false);
        return this.setCategoryMap(category, productResponse.data);
      })
    );
  }
  fetchFilteredProducts(filters: any) {
    this.loaderService.setLoader(true);
    return this.dataStorageService.fetchProductsFiltered(filters).pipe(
      tap((productResponse) => {
        this.loaderService.setLoader(false);
        this.filteredProducts = productResponse.data;
        this.productsChanged.next(this.filteredProducts);
      })
    );
  }
  getProducts() {
    return this.filteredProducts;
  }
  getCategories() {
    return this.categories;
  }
}
