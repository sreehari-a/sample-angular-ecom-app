import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { APIService } from './api-service';

export type CategoryResponse = {
  data: {
    id: number;
    createdAt: string;
    name: string;
    publishedAt: string;
    updatedAt: string;
  }[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};
export type ProductResponse = {
  data: Product[];
};

// const hostname = 'http://localhost:3000'; //Local Environment
const hostname= `https://products-db-sample.herokuapp.com`; // Production environment

@Injectable()
export class DataStorageService {
  constructor(private http: HttpClient, private apiService: APIService) {}
  fetchAllproducts() {
    return this.http.get<Product[]>(`${hostname}/products`);
  }
  fetchAllCategories() {
    return this.http.get<CategoryResponse>(
      `${hostname}/categories`
    );
  }
  fetchProductsOfCategory(category: string) {
    let filter = null;
    if (category) {
      filter = {
        category,
      };
    }
    return this.apiService.createGetApi<ProductResponse>(
      `${hostname}/products`,
      filter
    );
  }
  fetchProductsFiltered(filters: any) {
    return this.apiService.createGetApi<ProductResponse>(
      `${hostname}/products`,
      filters
    );
  }
}
