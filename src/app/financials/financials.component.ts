import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-financials',
  templateUrl: './financials.component.html',
  styleUrls: ['./financials.component.scss']
})
export class FinancialsComponent implements OnInit {

  constructor(private alertify: AlertifyService) { }

  ngOnInit() {
  }

  onTabChange(event) {
    this.alertify.message('Changed to tab: ' + event.index);
}

}
