import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AlertifyService } from '../services/alertify.service';
import { AppRepositoryService } from '../services/apprepository.service';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
model: any = {};
registerForm: FormGroup;

@Output() cancelRegister = new EventEmitter();

constructor(private alertify: AlertifyService, private fb: FormBuilder,
  private appsvc: AppRepositoryService, private router: Router) { }

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      userLoginName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      pwd: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      userName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      nickName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      amailAddr: ['', [Validators.minLength(3), Validators.maxLength(40)]],
      emailAddr: ['', [Validators.email, Validators.minLength(3), Validators.maxLength(50)]],
      age: ['', [Validators.maxLength(3)]],
      gender: ['', [Validators.maxLength(10)]],
      city: ['', [Validators.maxLength(50)]],
      country: ['', [Validators.maxLength(50)]],
      occupation: ['', [Validators.maxLength(50)]]
    });
  }

  // createRegisterForm() {
  //   this.registerForm = this.fb.group({
  //     userLoginName: ['',  [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
  //     userName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
  //     emailAddr: ['', Validators.email],
  //     pwd: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
  //   });
  // }

  register() {
     let bnum = Math.random() * (Math.random() * Math.PI) * Math.random() * 10000000;
     bnum = Math.floor(bnum);
    this.model = Object.assign({}, this.registerForm.value);
    this.model.userId = this.appsvc.makeId(32);
    console.log(this.model);
    this.appsvc.register(this.model).subscribe(() => {
      this.alertify.success('Welcome to dbArmor!');
      // console.log('Registration successful');
       this.cancelRegister.emit(false);
    }, error => {
      // console.log('Registration failed.');
      this.alertify.error('Registration failed, try different login values.');
    });
   }

  cancel() {
    this.cancelRegister.emit(false);
    console.log(this.model);
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
