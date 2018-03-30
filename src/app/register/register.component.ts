import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AlertifyService } from '../services/alertify.service';
import { AppRepositoryService } from '../services/apprepository.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
model: any = {};


@Output() cancelRegister = new EventEmitter();

  constructor(private alertify: AlertifyService, private appsvc: AppRepositoryService) { }

  ngOnInit() {
    let bnum = Math.random() * (Math.random() * Math.PI) * Math.random() * 100000;
    bnum = Math.floor(bnum);
    this.model.userId = bnum;
    this.model.userName = 'not set yet';
    this.model.emailAddr = 'not set yet';
    this.model.country = 'not set yet';
    this.model.postalCode = 'not set yet';
  }

  register() {
    // console.log(this.model);
    this.appsvc.register(this.model).subscribe(() => {
      this.alertify.success('Welcome to dbArmor!');
      console.log('Registration successful');
      // this.appsvc.goHome();
       this.cancelRegister.emit(false);
    }, error => {
      console.log('Registration failed.');
      this.alertify.error('Registration failed, try different login values.');
    });
    // this.alertify.success('Welcome, registration successful.');
  }

  cancel() {
    this.cancelRegister.emit(false);
    console.log(this.model);
    this.alertify.warning('Registration cancelled.');
  }

}
