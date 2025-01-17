import { Component } from '@angular/core';
import { GlobalService } from './service/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  loading$;
  error$;

  constructor(private globalService: GlobalService) {
    this.loading$ = this.globalService.loading$;
    this.error$ = this.globalService.error$;
  }
}
