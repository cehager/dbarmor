import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import { NavComponent } from './nav/nav.component';

export const routes: Routes = [
    {path: '', component: NavComponent},
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
