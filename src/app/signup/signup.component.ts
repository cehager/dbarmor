import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  maxDate;

  constructor() { }

  ngOnInit() {
    this.maxDate = new Date();
    const yr = this.maxDate.getFullYear() - 18;
    this.maxDate.setFullYear(yr);
  }

  onSubmit(form: NgForm) {
    console.log(form);
    console.log(this.maxDate);

  }
}
