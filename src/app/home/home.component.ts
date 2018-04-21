import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { AppRepositoryService } from '../services/apprepository.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  registerMode = false;

  constructor(private router: Router) { }

  ngOnInit() {  }

  goFree() {
    this.router.navigate(['/editor']);
  }

  registerToggle() {
    // this.registerMode = true;
    this.router.navigate(['/registerna']);
    // this.router.navigate(['/register']);
  }

  cancelRegisterMode(registerMode: boolean) {
    // this.registerMode = registerMode;
    this.router.navigate(['/home']);
  }
}
