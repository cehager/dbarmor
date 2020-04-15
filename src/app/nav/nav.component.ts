import { Component, OnInit } from '@angular/core';
import { AppRepositoryService } from '../services/apprepository.service';
import { AlertifyService } from '../services/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
 model: any = {};
 // userLoginName: string;
 // pwd: string;
 loginForm: FormGroup;
 //blockChars: RegExp = /^[^*|\":<>%[\]{}`\\()';^,\+_\=\-~\/\?\!\#&$\s*]+$/;  //a-zA-z0-9@. only
//blockPwdChars: RegExp = /^[^*|\":<>%[\]{}`\\()';^,\+_\=\-~\/&$\s*]+$/;  //a-zA-z0-9@. only



  constructor(private appService: AppRepositoryService, private alertify: AlertifyService,
     private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.createLoginForm();
    //this.appService.userToken = null;
    // this.isUserLoggedIn = false;
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      userLoginName: ['',  [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      pwd: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    });
  }

  login() {
    this.appService.userToken = null;
    // this.model.userLoginName = this.userLoginName;
    // this.model.pwd = this.pwd;
    // console.log(this.loginForm.value);
    this.model = Object.assign({}, this.loginForm.value);
    // console.log(this.model);

    this.appService.onLogin(this.model).subscribe(data => {
      // console.log('logged in successful');
      this.appService.activeUserLoginName = this.model.userLoginName;
      this.alertify.success('Login successful, welcome to dbArmor, enjoy!');
      // this.isUserLoggedIn = true;
    }, error => {
      this.appService.userToken = null;
      this.alertify.error('Login unsuccesful, try again.');
      // this.isUserLoggedIn = false;
      // console.log('failed to login');
    });
  }

  logout() {
    this.appService.userToken = null;
    this.router.navigate(['/home']);
    this.alertify.success('You are now logged out.');
    // this.isUserLoggedIn = false;
  }

  loggedIn() {
    const token = this.appService.userToken;
    return !!token;
  }
}
