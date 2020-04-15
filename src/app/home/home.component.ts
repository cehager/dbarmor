import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
// import { AppRepositoryService } from '../services/apprepository.service';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  registerMode = false;

  constructor(private router: Router) {}

  ngOnInit() {}

  goFree() {
    this.router.navigate(["/editor"]);
  }

  registerToggle() {
    //this.registerMode = true;
    //console.log('in register toggle');
    // test
    this.router.navigate(["/register"]);
    //this.router.navigate(['/registerna']);
  }

  cancelRegisterMode(registerMode: boolean) {
    // this.registerMode = registerMode;
    this.router.navigate([""]);
  }
}
