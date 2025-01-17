import { Component, input } from '@angular/core';
import { IConvertedCountry } from '../../models/interfacies';

@Component({
  selector: 'app-card',
  standalone: true,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  country = input<IConvertedCountry>({
    flag: '',
    name: '',
    capital: '',
    population: '',
  });
}
