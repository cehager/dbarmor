import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {AlertifyService} from './services/alertify.service';
import {BsDropdownModule} from 'ngx-bootstrap';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AppRepositoryService } from './services/apprepository.service';
import { AppRoutes } from './app.routes';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent
],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    AppRoutes
  ],
  providers: [AlertifyService, AppRepositoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
