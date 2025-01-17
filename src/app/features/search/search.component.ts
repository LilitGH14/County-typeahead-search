import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  catchError,
  debounceTime,
  Observable,
  of,
  Subject,
  Subscription,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { Store } from '@ngrx/store';
import { SearchFeatureState } from './store/search.reducers';
import {
  loadSearchData,
  loadSearchDataFailure,
  loadSearchDataSuccess,
  setTypeaheadData,
} from './store/search.actions';
import { ICountry } from '../../shared/models/interfacies';
import { SearchService } from './servicies/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  searchTerm = '';
  countries: ICountry[] = [];
  page = 0;
  totalCount = 0;
  suggestions: string[] = [];
  isLoading = false;
  noResults = false;

  private subscription: Subscription | undefined;
  private searchSubject = new Subject<string>();
  typeahead$: Observable<{}>;
  countries$: Observable<ICountry[]>;

  @ViewChild('uiElement') uiElement?: ElementRef;

  constructor(
    private searchService: SearchService,
    private store: Store<{ search: SearchFeatureState }>
  ) {
    this.typeahead$ = store.select((state) => state.search.typeahead);
    this.countries$ = store.select((state) => state.search.data);
  }

  ngOnInit(): void {
    this.subscription = this.searchSubject
      .pipe(
        debounceTime(500),
        tap(() => {
          this.isLoading = true;
          this.noResults = false;
        }),
        switchMap((query) =>
          this.searchService.getCountryData(query).pipe(
            catchError(() => {
              this.isLoading = false;

              this.store.dispatch(
                loadSearchDataFailure({ error: 'Something went wrong!' })
              );
              return of([]);
            })
          )
        )
      )
      .subscribe((results: ICountry[]) => {
        this.countries = results.slice(0, 6);
        this.page += 1;
        this.totalCount = results.length;

        this.store.dispatch(
          setTypeaheadData({ searchVal: this.searchTerm, data: results })
        );
        this.store.dispatch(loadSearchDataSuccess({ data: results }));

        this.isLoading = false;

        if (this.countries.length === 0) {
          this.noResults = true;
        }
      });
  }

  onChange(q: any): void {
    if (q.inputType === 'deleteContentBackward') {
      if (this.searchTerm.length < 2) {
        this.store.dispatch(loadSearchDataSuccess({ data: [] }));
        this.suggestions = [];
        this.countries = [];
        this.noResults = true;
      } else {
        this.searchSubject.next(this.searchTerm);
        this.noResults = false;
        this.suggestions = [];
      }
    }
  }

  onSearchChange(query: string): void {
    if (query.length > 1) {
      this.filterResults(query);
    } else {
      this.store.dispatch(loadSearchDataSuccess({ data: [] }));
      this.suggestions = [];
      this.countries = [];
      this.noResults = true;
    }
  }

  async loadData(): Promise<void> {
    const nativeElement = this.uiElement?.nativeElement;

    if (
      nativeElement &&
      this.isScrollAtBottom(nativeElement) &&
      this.countries.length !== this.totalCount
    ) {
      this.searchService.getBatch(this.page).subscribe((batch: ICountry[]) => {
        this.countries = [...this.countries, ...batch];
        this.store.dispatch(
          setTypeaheadData({ searchVal: this.searchTerm, data: this.countries })
        );
        this.page += 1;
      });
    }
  }

  private isScrollAtBottom(element: HTMLElement): boolean {
    return (
      Math.round(element.clientHeight + element.scrollTop) >=
      element.scrollHeight - 1
    );
  }

  private filterResults(query: string): any {
    this.store.select('search').subscribe((state) => {
      const results = state.typeahead;

      const filteredResults = Object.keys(results).filter((c) =>
        c.toLowerCase().trim().includes(query.toLowerCase().trim())
      );

      if (filteredResults.length > 0) {
        this.suggestions = filteredResults;
      } else {
        this.searchSubject.next(query);
        this.noResults = false;
      }
    });
  }

  selectSuggestion(suggestion: string) {
    this.searchTerm = suggestion;
    this.suggestions = [];

    this.store
      .select('search')
      .pipe(take(1))
      .subscribe((state) => {
        const results = state.typeahead[suggestion];

        if (results) {
          this.countries = results.slice(0, 6);
          this.totalCount = results.length;
          this.page += 1;
          this.store.dispatch(loadSearchDataSuccess({ data: results }));
        }
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
