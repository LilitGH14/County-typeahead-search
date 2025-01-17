import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { SearchService } from './servicies/search.service';
import { FormsModule } from '@angular/forms';
import { CardComponent } from '../../shared/components/card/card.component';
import { CountryCardPipe } from '../../shared/pipes/country-card.pipe';
import { SearchStateModule } from './store/search-state.module';
import { LengthPipe } from '../../shared/pipes/length.pipe';

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    FormsModule,
    SearchRoutingModule,
    SearchStateModule,
    CardComponent,
    CountryCardPipe,
    LengthPipe
  ],
  providers: [SearchService],
})
export class SearchModule {}
