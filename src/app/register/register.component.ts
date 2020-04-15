import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AlertifyService } from '../services/alertify.service';
import { AppRepositoryService } from '../services/apprepository.service';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
//import { User } from '../services/models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
model: any = {};
registerForm: FormGroup;
blockChars: RegExp = /^[^*|\":<>%[\]{}`\\()';^,\+_\=\-~\/\?\!\#&$\s*]+$/;  //a-zA-z0-9@. only
blockPwdChars: RegExp = /^[^*|\":<>%[\]{}`\\()';^,\+_\=\-~\/&$\s*]+$/;  //a-zA-z0-9@. only
nbrsOnly: RegExp = /^[0-9]*$/;
ishidden: boolean;
@Output() cancelRegister = new EventEmitter();

constructor(private alertify: AlertifyService, private fb: FormBuilder,
  private appsvc: AppRepositoryService, private router: Router) { }

  ngOnInit() {
    this.createRegisterForm();
    this.ishidden = false;
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      userId: [''],
      userLoginName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      userName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      amailAddr: [''],
      emailAddr: ['', [Validators.email, Validators.minLength(3), Validators.maxLength(50)]],
      mobilePhone: [''],
      pwd: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      cPwd: [''],
      age: [0, [Validators.maxLength(3)]],
      gender: ['', [Validators.maxLength(4), Validators.minLength(4)]],
      city: ['', [Validators.maxLength(50)]],
      postalCode: [''],
      country: ['', [Validators.maxLength(50)]],
      occupation: ['', [Validators.maxLength(50)]]
    });
  }

  doShowPwd() {
    this.ishidden = false;
  }

  doHidePwd() {
    this.ishidden = true;
  }

  register() {
     //let bnum = Math.random() * (Math.random() * Math.PI) * Math.random() * 10000000;
     //bnum = Math.floor(bnum);
    this.model = Object.assign({}, this.registerForm.value);
    //this.model.amailAddr = this.model.userLoginName;
    this.model.userId = this.appsvc.makeId(32);
    //console.log(this.model);
    this.appsvc.register(this.model).subscribe(() => {
      this.alertify.success('Welcome to dbArmor!');
      // console.log('Registration successful');
       this.cancelRegister.emit(false);
    }, error => {
      // console.log('Registration failed.');
      this.alertify.error('Registration failed, try different login ID.');
    });
   }

  cancel() {
    this.cancelRegister.emit(false);
    //console.log(this.model);
    this.alertify.warning('Registration cancelled.');
    this.router.navigate(['']);
  }

  // private handleError(error: any) {
  //   const applicationError = error.headers.get('Application-Error');
  //   if (applicationError) {
  //     return Observable.throw(applicationError);
  //   }
  //   const serverError = error.json();
  //   let modelStateErrors = '';
  //   if (serverError) {
  //     for (const key in serverError) {
  //       if (serverError[key]) {
  //         modelStateErrors += serverError[key] + '\n';
  //       }
  //     }
  //   }
  //   return Observable.throw(modelStateErrors || 'Server error');
  // }

}
