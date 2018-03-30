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
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {path: 'messages', component: MessageComponent},
            {path: 'contacts', component: ContactsComponent},
            {path: 'dailylog', component: DailyLogComponent},
            {path: 'documents', component: DocumentComponent},
        ]
    },
    {path: '**', redirectTo: 'home', pathMatch: 'full'}
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
