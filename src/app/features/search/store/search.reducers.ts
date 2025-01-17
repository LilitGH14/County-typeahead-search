import { createReducer, on } from '@ngrx/store';
import {
  loadSearchData,
  loadSearchDataFailure,
  loadSearchDataSuccess,
  setTypeaheadData,
} from './search.actions';
import { ICountry } from '../../../shared/models/interfacies';

export interface SearchFeatureState {
  data: any[];
  error: string;
  typeahead: { [key: string]: ICountry[] };
}

export const initialState: SearchFeatureState = {
  data: [],
  error: '',
  typeahead: {},
};

export const searchReducer = createReducer(
  initialState,
  on(loadSearchData, (state) => ({ ...state, error: '' })),
  on(loadSearchDataSuccess, (state, { data }) => ({ ...state, data })),
  on(loadSearchDataFailure, (state, { error }) => ({ ...state, error })),
  on(setTypeaheadData, (state, { searchVal, data }) => ({
    ...state,
    typeahead: {
      ...state.typeahead,
      [searchVal]: data,
    },
  }))
);
