import { Component, OnInit } from '@angular/core';
import { AppRepositoryService } from '../services/apprepository.service';
import { AlertifyService } from '../services/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder  } from '@angular/forms';
import { FsEdu } from '../services/models/fsEdu';

@Component({
  selector: 'app-financial-mgmt',
  templateUrl: './financial-mgmt.component.html',
  styleUrls: ['./financial-mgmt.component.scss']
})
export class FinancialMgmtComponent implements OnInit {
fsEdus: FsEdu[];
model: any = {};
fsEduForm: FormGroup;

  constructor(private appService: AppRepositoryService, private fb: FormBuilder, private alertify: AlertifyService ) {

   }

  ngOnInit() {
    this.getEduDataByActiveUserId();
    this.createEduForm();
  }


  createEduForm() {
    this.fsEduForm = this.fb.group({
      urlPath: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      notes: ['', Validators.maxLength(500)],
      id: [0, Validators.maxLength(50)]
    });
  }



  //activeUserId is automatically set in the apprepository
  getEduDataByActiveUserId() {
    this.appService.getFsEdus().subscribe((fsedus: FsEdu[]) => {
      this.fsEdus = fsedus;
      console.log('fsedus: ', this.fsEdus);
      //console.log(contacts);
    }, error => {
      console.log(error);
      //this.alertify.error(error);
    });
  }

  rowsSelected() {
    return true;
  }

  doEditCompleted(event) {
    return true;
  }

  onRowSelected(event) {
    this.fsEduForm.patchValue(({
      id: event.data.id,
      userId: event.data.userId,
      urlPath: event.data.urlPath,
      description: event.data.description,
      notes: event.data.notes
    }));
  }

  post() {
    // let bnum = Math.random() * (Math.random() * Math.PI) * Math.random() * 10000000;
    // bnum = Math.floor(bnum);
    if (this.fsEduForm.invalid) {
    //console.log('contact form values are: ', this.contactForm);
    if (this.fsEduForm.get('userName').invalid) {
      this.alertify.dialog('Got It!', '<h4>Contact Name field is required.<h4>');
    }

    if (this.fsEduForm.get('amailAddr').invalid) {
      this.alertify.dialog('Got It!', '<h4>ARMORED address field is required.<h4>');
    }

    this.alertify.error('Contact was not saved.');
    return;
  }

  this.model = Object.assign({}, this.fsEduForm.value);
  console.log('adding a new contact: ', this.model);
  if (this.fsEduForm.get('id').value === 0) {
   this.model.userId = this.appService.activeUserId; //link this contact to current user.
   this.model.age = 0;
   //console.log(this.model);
   this.appService.postContacts(this.model).subscribe(() => {
    this.fsEdus.push(this.fsEduForm.value);
    //this.contactForm.reset();
     //console.log('added new contact: ', this.contactForm.value);
     this.getEduDataByActiveUserId();
     this.alertify.success('Contact added successfully and is ARMORED!');
   }, error => {
    this.alertify.error('Error trying to add contact. Check your Internet connection.');
   });
  } else {
    //console.log('updating a contact: ', this.contactForm.value);
    this.model.userId = this.appService.activeUserId; //link this contact to current user.
    // console.log(this.model);
    this.appService.putContacts(this.model).subscribe(() => {
      this.getEduDataByActiveUserId();
      this.alertify.success('Contact successfully updated and is ARMORED!');
    }, error => {
     this.alertify.error('Error trying to add contact. Check your Internet connection.');
    });
   }
  }
}
