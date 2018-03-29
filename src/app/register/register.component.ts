import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
model: any = {};
@Output() cancelRegister = new EventEmitter();

  constructor(private alertify: AlertifyService) { }

  ngOnInit() {
  }

  register() {
    console.log(this.model);
    this.alertify.success('Welcome, registration successful.');
  }

  cancel() {
    this.cancelRegister.emit(false);
    console.log(this.model);
    this.alertify.warning('Registration cancelled.');
  }

}
