import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ProductService } from 'src/app/common/product-service';

@Injectable()
export class FilterService {
  activeFilters: any = {};
  filterTypes = {
    NUMBER_RANGE: 'NumberRange',
    TEXT_FIELD: 'TextField',
    STAR_RATING: 'StarRating',
    DROPDOWN: 'Dropdown',
  };
  constructor(private productService: ProductService, private router: Router) {}
  buildFilters(filters: any) {
    let updatedFilter: any = {};
    for (let key in filters) {
      if (filters[key]) {
        switch (key) {
          case 'category':
            updatedFilter.category = filters.category;
            break;
          case 'title':
            updatedFilter[key] = {
              ['$regex']: filters[key],
              ['$options']: 'i',
            };
            break;
          case 'minPrice':
            updatedFilter.price = {
              ['$gte']: filters.minPrice,
            };
            break;
          case 'maxPrice':
            updatedFilter.price = {
              ...updatedFilter.price,
              ['$lte']: filters.maxPrice,
            };
            break;
          case 'minRating':
            updatedFilter['rating.rate'] = {
              ['$gte']: filters.minRating,
            };
            break;
          case 'maxRating':
            updatedFilter['rating.rate'] = {
              ...updatedFilter['rating.rate'],
              ['$lte']: filters.maxRating,
            };
            break;
        }
      }
    }
    return updatedFilter;
  }
  applyFilter(filter: any) {
    this.router.navigate(['/products'], {
      queryParams: filter,
    });
  }
  filterProducts(filters: any) {
    const updatedFilters = this.buildFilters(filters);
    this.productService
      .fetchFilteredProducts(updatedFilters)
      .subscribe(() => {});
  }
}
