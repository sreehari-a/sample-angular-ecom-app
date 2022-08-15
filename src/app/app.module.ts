import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ListItemComponent } from './shopping-list/list-item/list-item.component';
import { DataStorageService } from './common/data-storage-service';
import { ProductService } from './common/product-service';
import { ProductsResolverService } from './common/product-resolver-service';
import { ModalModule } from './components/modal';
import { CartService } from './common/cart-service';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CartItemComponent } from './shopping-cart/cart-item/cart-item.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { NumberSwitchComponent } from './components/number-switch/number-switch.component';
import { AppResolverService } from './common/app-resolver-service';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { APIService } from './common/api-service';
import { LoaderComponent } from './components/loader/loader.component';
import { LoaderService } from './common/loader-service';
import { FiltersComponent } from './components/filters/filters.component';
import { FormsModule } from '@angular/forms';
import { FilterService } from './components/filters/filter-service';

@NgModule({
  declarations: [
    AppComponent,
    ShoppingListComponent,
    AppHeaderComponent,
    ListItemComponent,
    ShoppingCartComponent,
    CartItemComponent,
    StarRatingComponent,
    NumberSwitchComponent,
    DropdownComponent,
    LoaderComponent,
    FiltersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ModalModule,
    NgbModule,
    FormsModule
  ],
  providers: [
    DataStorageService,
    APIService,
    ProductService,
    LoaderService,
    FilterService,
    ProductsResolverService,
    AppResolverService,
    CartService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
