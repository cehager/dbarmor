import { Component, OnInit } from '@angular/core';
import { AppRepositoryService } from '../services/apprepository.service';
import { AlertifyService } from '../services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  constructor(private appService: AppRepositoryService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.appService.onLogin(this.model).subscribe(data => {
      // console.log('logged in successful');
      this.alertify.success('Login successful, welcome to dbArmor, enjoy!');
    }, error => {
      this.alertify.error('Login unsuccesful, try again.');
      // console.log('failed to login');
    });
  }

  logout() {
    this.appService.userToken = null;
    this.router.navigate(['/home']);
    this.alertify.success('You are now logged out.');

  }

  loggedIn() {
    const token = this.appService.userToken;
    return !!token;
  }
}
