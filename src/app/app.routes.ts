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
import { RegisterComponent } from './register/register.component';
import { ChatsComponent } from './chats/chats.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { TodosComponent } from './todos/todos.component';
import { RegisternaComponent } from './registerna/registerna.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'editor', component: EditorComponent},
    {path: 'messages', component: MessageComponent, canActivate: [AuthGuard]},
    {path: 'contacts', component: ContactsComponent},
    {path: 'dailylog', component: DailyLogComponent},
    {path: 'documents', component: DocumentComponent, canActivate: [AuthGuard]},
    {path: 'chats', component: ChatsComponent, canActivate: [AuthGuard]},
    {path: 'notifications', component: NotificationsComponent, canActivate: [AuthGuard]},
    {path: 'todos', component: TodosComponent, canActivate: [AuthGuard]},
    {path: 'fafro', component: TodosComponent, canActivate: [AuthGuard]},
    {path: 'register', component: RegisterComponent},
    {path: 'registerna', component: RegisternaComponent},
    {path: '**', redirectTo: 'home', pathMatch: 'full'}
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);

// export const routes: Routes = [
//     {path: 'home', component: HomeComponent},
//     {path: 'editor', component: EditorComponent},
//     {
//         path: '',
//         runGuardsAndResolvers: 'always',
//         canActivate: [AuthGuard],
//         children: [
//             {path: 'messages', component: MessageComponent},
//             {path: 'contacts', component: ContactsComponent},
//             {path: 'dailylog', component: DailyLogComponent},
//             {path: 'documents', component: DocumentComponent}
//         ]
//     },
//     {path: '**', redirectTo: 'home', pathMatch: 'full'}
// ];
