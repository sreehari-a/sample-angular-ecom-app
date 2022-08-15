import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/common/product-service';
import { FilterService } from './filter-service';



@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})
export class FiltersComponent implements OnInit {
  @Input() filters: any = [];
  categories: string[] = [];
  starRatingOptions = [];
  constructor(private productService: ProductService, private filterService: FilterService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {    
    this.productService.categoriesChanged.subscribe((categories) => {
      this.categories = categories;
    });
  }
  submitForm(form: NgForm) {
    const filters: any = {};
    for(let key in form.value) {
      if(form.value[key]) {
        filters[key] = form.value[key];
      }
    }
    this.filterService.applyFilter(filters);
  }
  clearFilters(form: NgForm) {
    form.reset()
  }
}
