import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { MessageComponent } from './message/message.component';
import { EditorComponent } from './editor/editor.component';
import { ContactsComponent } from './contacts/contacts.component';
import { DailyLogComponent } from './daily-log/daily-log.component';
import { DocumentComponent } from './document/document.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'editor', component: EditorComponent},
    {path: 'messages', component: MessageComponent, canActivate: [AuthGuard]},
    {path: 'contacts', component: ContactsComponent, canActivate: [AuthGuard]},
    {path: 'dailylog', component: DailyLogComponent, canActivate: [AuthGuard]},
    {path: 'documents', component: DocumentComponent, canActivate: [AuthGuard]},
    {path: '**', redirectTo: 'home', pathMatch: 'full'}
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}

