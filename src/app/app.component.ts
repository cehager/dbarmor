import { Component, OnInit } from '@angular/core';
import { AlertifyService } from './services/alertify.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'dbArmor';

  constructor(private alertify: AlertifyService) {}

  ngOnInit() {
    this.alertify.success('Welcome to dbArmor again!');
  }

}
