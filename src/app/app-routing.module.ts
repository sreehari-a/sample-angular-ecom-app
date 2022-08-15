import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppResolverService } from './common/app-resolver-service';
import { ProductsResolverService } from './common/product-resolver-service';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
    resolve: [AppResolverService]
  },
  {
    path: 'home',
    component: ShoppingListComponent,
    resolve: [ ProductsResolverService]
  },
  {
    path: 'products',
    component: ShoppingListComponent,
    resolve: [AppResolverService,ProductsResolverService]
  },
  {
    path: 'shopping-cart',
    component: ShoppingCartComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
