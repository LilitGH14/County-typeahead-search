import { Component, input, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-toaster',
  standalone: true,
  imports: [],
  templateUrl: './error-toaster.component.html',
  styleUrl: './error-toaster.component.scss',
})
export class ErrorToasterComponent implements OnInit {
  error = input();
  showsToast = true;

  ngOnInit() {
    this.showToast();
  }

  showToast(): void {
    setTimeout(() => {
      this.showsToast = false;
    }, 2000);
  }
}
