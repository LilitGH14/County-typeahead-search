import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SEARCH_COUNTRY_URL } from '../../../configs/routesConfigs';
import { Observable, of, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { SearchFeatureState } from '../store/search.reducers';
import { ICountry } from '../../../shared/models/interfacies';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private pageSize: number = 6;
  results$: Observable<ICountry[]>;

  constructor(
    private http: HttpClient,
    private store: Store<{ search: SearchFeatureState }>
  ) {
    this.results$ = store.select((state) => state.search.data);
  }

  getCountryData(country: string): Observable<any[]> {
    return this.http.get<any[]>(SEARCH_COUNTRY_URL(country));
  }

  getBatch(page: number): Observable<any[]> {
    return this.results$.pipe(
      switchMap((results) => {
        const start = (page - 1) * this.pageSize;
        const end = start + this.pageSize;
        return of(results.slice(start, end));
      })
    );
  }
}
