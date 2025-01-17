import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterOutlet } from '@angular/router';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import { GeneralInterceptor } from './core/interceptors/interceptor.service';
import { LoaderComponent } from './core/components/loader/loader.component';
import { GlobalService } from './service/global.service';
import { ErrorToasterComponent } from './core/components/error-toaster/error-toaster.component';
import { GlobalStateModule } from './store/search-state.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    RouterOutlet,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LoaderComponent,
    GlobalStateModule,
    ErrorToasterComponent
  ],
  providers: [
    provideHttpClient(withFetch()),
    GlobalService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GeneralInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
