import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './features/not-found/not-found/not-found.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/search/search.module').then((m) => m.SearchModule),
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
