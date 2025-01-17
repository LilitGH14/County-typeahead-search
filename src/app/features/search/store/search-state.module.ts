import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import * as fromOrders from './search.reducers';

@NgModule({
  imports: [StoreModule.forFeature('search', fromOrders.searchReducer)],
  declarations: [],
})
export class SearchStateModule {}
