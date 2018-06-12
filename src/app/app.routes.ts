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
import { AblumsComponent } from './ablums/ablums.component';
import { FafronComponent } from './fafron/fafron.component';
import { FinancialsComponent } from './financials/financials.component';
import { MediaMgrComponent } from './media-mgr/media-mgr.component';
import { BulletinBoardComponent } from './bulletin-board/bulletin-board.component';
import { CloakedMessageComponent } from './cloaked-message/cloaked-message.component';
import { CloakedLibraryComponent } from './cloaked-library/cloaked-library.component';
import { CloakedArchiveComponent } from './cloaked-archive/cloaked-archive.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'editor', component: EditorComponent},
    {path: 'messages', component: MessageComponent, canActivate: [AuthGuard]},
    {path: 'contacts', component: ContactsComponent, canActivate: [AuthGuard]},
    {path: 'dailylog', component: DailyLogComponent, canActivate: [AuthGuard]},
    {path: 'documents', component: DocumentComponent, canActivate: [AuthGuard]},
    {path: 'chats', component: ChatsComponent, canActivate: [AuthGuard]},
    {path: 'notifications', component: NotificationsComponent, canActivate: [AuthGuard]},
    {path: 'ablums', component: MediaMgrComponent, canActivate: [AuthGuard]},
    {path: 'fafron', component: FafronComponent, canActivate: [AuthGuard]},
    {path: 'financials', component: FinancialsComponent, canActivate: [AuthGuard]},
    {path: 'bulletinboard', component: BulletinBoardComponent},
    {path: 'cloaked', component: CloakedMessageComponent, canActivate: [AuthGuard]},
    {path: 'cloakedlibrary', component: CloakedLibraryComponent, canActivate: [AuthGuard]},
    {path: 'cloakedarchive', component: CloakedArchiveComponent, canActivate: [AuthGuard]},
    {path: 'register', component: RegisterComponent},
    {path: 'registerna', component: RegisternaComponent},
    {path: '', component: HomeComponent},
    {path: '**', redirectTo: '', pathMatch: 'full'}
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
