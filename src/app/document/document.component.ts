import { Component, OnInit } from '@angular/core';
import { AppRepositoryService } from '../services/apprepository.service';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {

  documents: Document[];


  constructor(private appService: AppRepositoryService, private alertify: AlertifyService ) { }

  ngOnInit() {
    //this.getContactsByActiveUserId();
  }

  //activeUserId is automatically set in the apprepository
  getContactsByActiveUserId() {
    this.appService.getDocuments().subscribe((documents: Document[]) => {
      this.documents = documents;
    }, error => {
      this.alertify.error(error);
    });
  }

  rowsSelected() {
    return true;
  }

  doEditCompleted(event) {
    return true;
  }

  onRowSelected(event) {
    return true;
  }

}
