import { environment } from '../../environments/environment';

export const REST_COUNTRIES_API_URL = environment.NG_REST_COUNTRIES_API_URL;
export const SEARCH_URL = REST_COUNTRIES_API_URL + '/name';
export const SEARCH_COUNTRY_URL = (country: string) =>
  SEARCH_URL + `/${country}`;
