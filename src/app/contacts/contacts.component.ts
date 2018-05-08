import { Component, OnInit } from '@angular/core';
import { Contact } from '../services/models/contact';
import { AppRepositoryService } from '../services/apprepository.service';
import { AlertifyService } from '../services/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder  } from '@angular/forms';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
contacts: Contact[];
//contacts: any[];
model: any = {};
//model: Contact;
contactForm: FormGroup;


  constructor(private appService: AppRepositoryService, private fb: FormBuilder, private alertify: AlertifyService ) {

   }

  ngOnInit() {
    this.getContactsByActiveUserId();
    // this.model.firstName = '';
    // this.model.lastName = '';
    // this.model.nickName = '';
    // this.model.aMailAddr = '';
    // this.model.eMailAddr = '';
    // this.model.age = 30;
    // this.model.gender = '';
    // this.model.city = '';
    // this.model.country = '';
    // this.model.occupation = '';
    this.createContactForm();
  }


  createContactForm() {
    this.contactForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      amailAddr: ['', Validators.maxLength(50)],
      emailAddr: ['', Validators.email],
      mobile: ['', Validators.maxLength(15)],
      phone: ['', Validators.maxLength(15)],
      wPhone: ['', Validators.maxLength(20)],
      age: ['', [Validators.maxLength(3)]],
      gender: ['', [Validators.required]],
      street: ['', [Validators.maxLength(50)]],
      city: ['', [Validators.maxLength(50)]],
      postalcode: ['', Validators.maxLength(15)],
      country: ['', [Validators.maxLength(50)]],
      occupation: ['', [Validators.maxLength(50)]],
      notes: ['', [Validators.maxLength(500)]],
      id: [0, [Validators.maxLength(50)]]
    });
  }



  //activeUserId is automatically set in the apprepository
  getContactsByActiveUserId() {
    this.appService.getContacts().subscribe((contacts: Contact[]) => {
      this.contacts = contacts;
      console.log('contacts: ', this.contacts);
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
    this.contactForm.patchValue(({
      userName: event.data.userName,
      amailAddr: event.data.amailAddr,
      emailAddr: event.data.emailAddr,
      mobile: event.data.mobile,
      phone: event.data.phone,
      wPhone: event.data.wPhone,
      age: event.data.age,
      gender:  event.data.gender,
      street: event.data.street,
      city: event.data.city,
      postalcode: event.data.postalcode,
      country: event.data.country,
      occupation: event.data.occupation,
      notes: event.data.notes,
      id: event.data.id
    }));

      //console.log(this.contactForm.get('userName').value);

     //console.log(event);
    //  event.data;

    //return true;
  }

  post() {
    // let bnum = Math.random() * (Math.random() * Math.PI) * Math.random() * 10000000;
    // bnum = Math.floor(bnum);

    this.model = Object.assign({}, this.contactForm.value);
  if (this.contactForm.get('id').value === 0) {
   //console.log('adding a contact: ', this.contactForm.value);
   this.model.userId = this.appService.activeUserId; //link this contact to current user.
   //console.log(this.model);
   this.appService.postContacts(this.model).subscribe(() => {
    this.contacts.push(this.contactForm.value);
    //this.contactForm.reset();
     //console.log('added new contact: ', this.contactForm.value);
     this.getContactsByActiveUserId();
     this.alertify.success('Contact added successfully and is ARMORED!');
   }, error => {
    this.alertify.error('Error trying to add contact. Check your Internet connection.');
   });
  } else {
    //console.log('updating a contact: ', this.contactForm.value);
    this.model.userId = this.appService.activeUserId; //link this contact to current user.
    // console.log(this.model);
    this.appService.putContacts(this.model).subscribe(() => {
      this.getContactsByActiveUserId();
      this.alertify.success('Contact successfully updated and is ARMORED!');
    }, error => {
     this.alertify.error('Error trying to add contact. Check your Internet connection.');
    });
   }
  }
}
