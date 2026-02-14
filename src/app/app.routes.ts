import { Routes } from '@angular/router';
import { HeroListComponent } from './features/heroes/hero-list/hero-list.component';
import { HeroFormComponent } from './features/heroes/hero-form/hero-form.component';
import { HeroDetailComponent } from './features/heroes/hero-detail/hero-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: '/heroes', pathMatch: 'full' },
  { path: 'heroes', component: HeroListComponent },
  { path: 'heroes/new', component: HeroFormComponent },
  { path: 'heroes/detail/:id', component: HeroDetailComponent },
  { path: 'heroes/edit/:id', component: HeroFormComponent },
  { path: '**', redirectTo: '/heroes' }
];