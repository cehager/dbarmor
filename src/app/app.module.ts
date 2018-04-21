import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {AlertifyService} from './services/alertify.service';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AppRepositoryService } from './services/apprepository.service';
// import { MaterialModule } from './material.module';
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
// import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SignupComponent } from './signup/signup.component';
import { NavHeaderComponent } from './nav/nav-header/nav-header.component';
import { SidenavListComponent } from './nav/sidenav-list/sidenav-list.component';
// import { EditorFroalaComponent } from './editor/editor-froala/editor-froala.component';
import {AppTopbarComponent} from './app.topbar.component';


// import {AccordionModule} from 'primeng/primeng'; // in use
import {AutoCompleteModule} from 'primeng/primeng';
// import {BreadcrumbModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/primeng'; // in use
// import {CalendarModule} from 'primeng/primeng';
// import {CarouselModule} from 'primeng/primeng';
// import {ColorPickerModule} from 'primeng/primeng';
// import {ChartModule} from 'primeng/primeng';
import {CheckboxModule} from 'primeng/primeng';
import {CardModule} from 'primeng/primeng';
// import {ChipsModule} from 'primeng/primeng';
// import {CodeHighlighterModule} from 'primeng/primeng';
// import {ConfirmDialogModule} from 'primeng/primeng';
import {SharedModule} from 'primeng/primeng'; // in use
import {ContextMenuModule} from 'primeng/primeng';
import {DataGridModule} from 'primeng/primeng';
import {DataListModule} from 'primeng/primeng';
import {DataScrollerModule} from 'primeng/primeng';
import {DataTableModule} from 'primeng/primeng'; // in use
import {DialogModule} from 'primeng/primeng';
import {DragDropModule} from 'primeng/primeng';
import {DropdownModule} from 'primeng/primeng';
import {FieldsetModule} from 'primeng/primeng';
import {FileUploadModule} from 'primeng/primeng';
// import {GalleriaModule} from 'primeng/primeng';
// import {GMapModule} from 'primeng/primeng';
// import {GrowlModule} from 'primeng/primeng';
import {InputMaskModule} from 'primeng/primeng'; // in use
import {InputSwitchModule} from 'primeng/primeng'; // in use
import {InputTextModule} from 'primeng/primeng'; // in use
import {InputTextareaModule} from 'primeng/primeng'; // in use
import {KeyFilterModule} from 'primeng/primeng';
// import {LightboxModule} from 'primeng/primeng';
import {ListboxModule} from 'primeng/primeng';
// import {MegaMenuModule} from 'primeng/primeng';
import {MenuModule} from 'primeng/primeng'; // in use
// import {MenubarModule} from 'primeng/primeng';
import {MessagesModule} from 'primeng/primeng'; // in use
import {MultiSelectModule} from 'primeng/primeng';
import {OrderListModule} from 'primeng/primeng';
// import {OrganizationChartModule} from 'primeng/primeng';
import {OverlayPanelModule} from 'primeng/primeng';
import {PaginatorModule} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
// import {PanelMenuModule} from 'primeng/primeng';
import {PasswordModule} from 'primeng/primeng';
import {PickListModule} from 'primeng/primeng';
import {ProgressBarModule} from 'primeng/primeng';
import {RadioButtonModule} from 'primeng/primeng';
// import {RatingModule} from 'primeng/primeng';
// import {ScheduleModule} from 'primeng/primeng';
import {ScrollPanelModule} from 'primeng/scrollpanel'; // in use
import {SelectButtonModule} from 'primeng/primeng';
// import {SlideMenuModule} from 'primeng/primeng';
import {SliderModule} from 'primeng/primeng';
import {SpinnerModule} from 'primeng/primeng';
// import {SplitButtonModule} from 'primeng/primeng';
import {StepsModule} from 'primeng/primeng';
// import {TableModule} from 'primeng/table';
// import {TabMenuModule} from 'primeng/primeng';
import {TabViewModule} from 'primeng/primeng';
// import {TerminalModule} from 'primeng/primeng';
// import {TieredMenuModule} from 'primeng/primeng';
import {ToggleButtonModule} from 'primeng/primeng';
// import {ToolbarModule} from 'primeng/primeng';
import {TooltipModule} from 'primeng/primeng';

import { AppRightpanelComponent } from './app.rightpanel.component';
import {AppInlineProfileComponent} from './app.profile.component';
import {AppMenuComponent, AppSubMenuComponent} from './app.menu.component';
import {AppFooterComponent} from './app.footer.component';
import { BreadcrumbService } from './breadcrumb.service';
import {AppBreadcrumbComponent } from './app.breadcrumb.component';
import { MessageService } from 'primeng/components/common/messageservice';
import { ChatsComponent } from './chats/chats.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { TodosComponent } from './todos/todos.component';
import { RegisternaComponent } from './registerna/registerna.component';

// import {TreeModule} from 'primeng/primeng';
// import {TreeTableModule} from 'primeng/primeng';



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
    ContactsComponent,
    SignupComponent,
    NavHeaderComponent,
    SidenavListComponent,
    AppTopbarComponent,
    AppRightpanelComponent,
    AppInlineProfileComponent,
    AppMenuComponent,
    AppSubMenuComponent,
    AppBreadcrumbComponent,
    AppFooterComponent,
    ChatsComponent,
    NotificationsComponent,
    TodosComponent,
    RegisternaComponent
],
  imports: [
    SharedModule,
    MenuModule,
    ScrollPanelModule,
    ButtonModule,
    BrowserModule,
    BrowserAnimationsModule,
    PasswordModule,
    CardModule,
    DataTableModule,
    PanelModule,
    InputTextModule,
    InputSwitchModule,
    InputMaskModule,
    AppRoutes,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    [FroalaEditorModule.forRoot(), FroalaViewModule.forRoot()],
    ReactiveFormsModule
  ],
  providers: [AlertifyService, MessageService, AppRepositoryService, AuthGuard, BreadcrumbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
