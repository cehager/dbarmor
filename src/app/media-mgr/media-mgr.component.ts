import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-media-mgr',
  templateUrl: './media-mgr.component.html',
  styleUrls: ['./media-mgr.component.scss']
})
export class MediaMgrComponent implements OnInit {

  constructor(private alertify: AlertifyService) { }

  ngOnInit() {
  }

  onTabChange(event) {
   // this.alertify.message('Changed to tab: ' + event.index);
}

}
