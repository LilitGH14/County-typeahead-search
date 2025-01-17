import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countryCard',
  standalone: true,
})
export class CountryCardPipe implements PipeTransform {
  transform(country: any): any {
    if (!country) return;

    return {
      name: country.name?.common || 'Unknown',
      flag: country.flags?.png || '',
      population: country.population || 'N/A',
      capital: country.capital?.[0] || 'N/A',
    };
  }
}
