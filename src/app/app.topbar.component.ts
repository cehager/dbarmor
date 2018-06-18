import {Component} from '@angular/core';
import {AppComponent} from './app.component';
import { AppRepositoryService } from './services/apprepository.service';
import { Router } from '@angular/router';
import { AlertifyService } from './services/alertify.service';

@Component({
    selector: 'app-topbar',
    template: `
        <div class="topbar clearfix">
            <div class="topbar-left">
               <h1 class="dbarmor-logo"><i>dbARMOR</i></h1>
            </div>
            <div class="topbar-right">
                <a id="menu-button" href="#" (click)="app.onMenuButtonClick($event)">
                    <i></i>
                </a>
                <a id="rightpanel-menu-button" href="#" (click)="app.onRightPanelButtonClick($event)">
                    <i class="material-icons">more_vert</i>
                </a>
                <a id="topbar-menu-button" href="#" (click)="app.onTopbarMenuButtonClick($event)">
                    <i class="material-icons">menu</i>
                </a>
                <ul class="topbar-items animated fadeInDown" [ngClass]="{'topbar-items-visible': app.topbarMenuActive}">
                    <li #profile class="profile-item" *ngIf="app.profileMode==='top'||app.isHorizontal()"
                        [ngClass]="{'active-top-menu':app.activeTopbarItem === profile}">

                        <a href="#" (click)="app.onTopbarItemClick($event,profile)">
                            <img class="profile-image" src="favicon.ico" />
                            <span class="topbar-item-name">Logout</span>
                        </a>

                        <ul class="ultima-menu animated fadeInDown">
                            <li role="menuitem">
                                <a (mouseover)="getActiveUserName()">
                                <i class="material-icons">person</i>
                                <span>{{ userName }}</span>
                            </a>
                            </li>
                            <li role="menuitem">
                                <a href="#">
                                    <i class="material-icons">person</i>
                                    <span>Profile</span>
                                </a>
                            </li>
                            <li role="menuitem">
                                <a href="#">
                                    <i class="material-icons">security</i>
                                    <span>Privacy</span>
                                </a>
                            </li>
                            <li role="menuitem">
                                <a href="#">
                                    <i class="material-icons">settings_applications</i>
                                    <span>Settings</span>
                                </a>
                            </li>
                            <li role="menuitem">
                                <a href="#" (click)="logout()" >
                                    <i class="material-icons">power_settings_new</i>
                                    <span>Logout</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
                <span *ngIf="show" class="trademark">Privatize Yourself&trade;</span>
            </div>
        </div>
    `
})
export class AppTopbarComponent {
    show: boolean;
    userName: string;

    constructor(private appService: AppRepositoryService, public app: AppComponent,
         private alertify: AlertifyService, private router: Router) {
         this.show = true;
         this.userName = 'dbArmor';
        }



        logout() {
            this.appService.userToken = null;
            this.router.navigate(['/home']);
            this.alertify.success('You are now logged out.');
          }

          getActiveUserName() {
              console.log('login name is: ', this.appService.activeUserLoginName);
            this.userName = this.appService.activeUserLoginName;
            //console.log('active user name: ' + this.userName);
          }
}
