import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ProductService } from 'src/app/common/product-service';
import { FilterService } from '../filters/filter-service';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css'],
})
export class AppHeaderComponent implements OnInit {
  @Input() categories: string[] = [];
  searchText = ''
  showSearchBar = false;
  category ='';
  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private filterService: FilterService
  ) {
    //@ts-ignore
    // if (route._routerState.snapshot.url?.contains('/products')) {
    //   this.showSearchBar = true;
    // }
  }
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if(params['category']) {
        this.category = params['category'];
      }
    });
    //@ts-ignore
    this.router.events
      .subscribe((event: any) => {
        if(event instanceof NavigationEnd && event.url) {
          this.showSearchBar = event.url.includes('/products');
        }
      });
  }

  changeCategory(event: any) {
    this.filterService.applyFilter({category: event.target.value});
    // this.router.navigate(['/products'], {
    //   queryParams: { category: event.target.value },
    // });
  }
  searchItem(event:any) {
    this.filterService.applyFilter({title: this.searchText});
  }
}
