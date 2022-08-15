import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductService } from '../common/product-service';
import { FilterService } from '../components/filters/filter-service';
import { ModalService } from '../components/modal';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  productList: Product[];
  filters: any;
  filterValues: any = {};
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private filterService: FilterService
  ) {
    const {
      snapshot: { queryParams: { category = 'default' } = {} },
    } = route;
    const productMap: any = this.productService.getProducts();
    this.productList = productMap[category];
    this.filters = this.getFilters();
  }

  ngOnInit(): void {
    this.productService.productsChanged.subscribe((productList) => {
      this.productList = productList;
    });
    this.productService.categoriesChanged.subscribe(() => {
      this.filters = this.getFilters();
    });
    this.route.queryParams.subscribe((params: Params) => {
      const {
        category = '',
        title = '',
        minPrice,
        maxPrice,
        minRating,
      } = params;
      this.filterValues = {
        category,
        title,
        minPrice,
        maxPrice,
        minRating,
      };
      this.filters = this.getFilters();
      this.filterService.filterProducts({
        category,
        title,
        minPrice,
        maxPrice,
        minRating,
      });
    });
  }

  getFilters = () => {
    const categories = this.productService.getCategories();
    const { filterTypes } = this.filterService;
    return [
      {
        field: 'title',
        type: filterTypes.TEXT_FIELD,
        label: 'Title',
        placeholder: 'Search for an item...',
        defaultValue: this.filterValues.title,
      },
      {
        field: 'category',
        type: filterTypes.DROPDOWN,
        label: 'Category',
        options: categories.map((category) => ({
          label: category,
          value: category,
        })),
        defaultValue: this.filterValues.category,
      },
      {
        field: 'price',
        type: filterTypes.NUMBER_RANGE,
        minField: 'minPrice',
        maxField: 'maxPrice',
        minLabel: 'Min Price',
        maxLabel: 'Max Price',
        min: 0,
        defaultValueMin: this.filterValues.minPrice,
        defaultValueMax: this.filterValues.maxPrice,
      },
      {
        field: 'minRating',
        type: filterTypes.STAR_RATING,
        label: 'Rating',
        defaultValue: this.filterValues.minRating,
      },
    ];
  };
}
