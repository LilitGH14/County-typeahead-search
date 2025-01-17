import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SearchFeatureState } from './search.reducers';

export const selectFeatureState =
  createFeatureSelector<SearchFeatureState>('feature');

export const selectFeatureData = createSelector(
  selectFeatureState,
  (state: SearchFeatureState) => state.data
);

export const selectFeatureError = createSelector(
  selectFeatureState,
  (state: SearchFeatureState) => state.error
);
