import { createAction, props } from '@ngrx/store';
import { ICountry } from '../../../shared/models/interfacies';

//Search Actions
export enum SearchActionTypes {
  LoadCountries = '[Search] Load Data',
  LoadCountriesSuccess = '[Search] Load Data Success',
  LoadCountriesFail = '[Search] Load Data Failure',
}

export const loadSearchData = createAction(SearchActionTypes.LoadCountries);
export const loadSearchDataSuccess = createAction(
  SearchActionTypes.LoadCountriesSuccess,
  props<{ data: any[] }>()
);
export const loadSearchDataFailure = createAction(
  SearchActionTypes.LoadCountriesFail,
  props<{ error: string }>()
);

//Typeahead Actions
export enum TypeaheadActionTypes {
  SetTyeahead = '[Typeahead] Set Data',
  GetTyeahead = '[Typeahead] Get Data',
}

export const setTypeaheadData = createAction(
  TypeaheadActionTypes.SetTyeahead,
  props<{ searchVal: string, data: ICountry[] }>()
);
