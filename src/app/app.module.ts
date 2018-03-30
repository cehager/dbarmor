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
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { EditorComponent } from './editor/editor.component';
import { MessageComponent } from './message/message.component';
import { DailyLogComponent } from './daily-log/daily-log.component';
import { DocumentComponent } from './document/document.component';
import { ContactsComponent } from './contacts/contacts.component';
import { AuthGuard } from './guards/auth.guard';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    EditorComponent,
    MessageComponent,
    DailyLogComponent,
    DocumentComponent,
    ContactsComponent
],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    AppRoutes,
    [FroalaEditorModule.forRoot(), FroalaViewModule.forRoot()],
  ],
  providers: [AlertifyService, AppRepositoryService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
