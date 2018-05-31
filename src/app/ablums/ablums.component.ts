import { Component, OnInit, Input } from '@angular/core';
import { Photo } from '../services/models/Photo';
import { AppRepositoryService } from '../services/apprepository.service';
import { AlertifyService } from '../services/alertify.service';
import { NgxGalleryImage, NgxGalleryOptions, NgxGalleryAnimation } from 'ngx-gallery';
import { FileUploader } from 'ng2-file-upload';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'app-ablums',
  templateUrl: './ablums.component.html',
  styleUrls: ['./ablums.component.scss']
})
export class AblumsComponent implements OnInit {

  //@Input() photos: Photo[];
  photos: Photo[];
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl: string;
  model: any = {};
  slideShowPix: any[] = [];
  //pix: Photo[];
  selectedPhoto: Photo;
  selectedValues: number[] = [];
  displayDialog: boolean;

  constructor(private appService: AppRepositoryService, private alertify: AlertifyService ) {}


   ngOnInit() {
    this.initializeUploader();
    this.baseUrl = this.appService.getApiBasePath();
    this.getPhotosByActiveUserId();


    // this.galleryOptions = [
    // {
    //   width: '350px',
    //   height: '500px',
    //   imagePercent: 100,
    //   thumbnailsColumns: 4,
    //   imageAnimation: NgxGalleryAnimation.Slide,
    //   preview: false
    // }
    // ];


    //this.galleryImages = this.getImages();
  }

  selectCar(event: Event, photo: Photo) {
    this.selectedPhoto = photo;
    this.displayDialog = true;
    event.preventDefault();
}

onDialogHide() {
  this.selectedPhoto = null;
}
  //url: 'https://4226-25056.el-alt.com/dex/photos/l1/' + this.appService.activeUserId,
  initializeUploader() {
    this.uploader = new FileUploader({
      //url: 'http://localhost:5445/dex/photos/l1/' + this.appService.activeUserId,
      url: 'https://4226-25056.el-alt.com/dex/photos/l1/' + this.appService.activeUserId,
      authToken: 'Bearer ' + this.appService.userToken,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          userId: res.userId,
          url: res.url,
          createdOn: res.createdOn,
          description: res.description,
          publicId: res.publicId
        };

        this.photos.push(photo);
      }
    };
  }


  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  getImages() {
    const imageUrls = [];
    for (let i = 0; i < this.photos.length; i++) {
      imageUrls.push({
        small: this.photos[i].url,
        medium: this.photos[i].url,
        big: this.photos[i].url,
        description: this.photos[i].description
      });
    }
    return imageUrls;
  }

   getPhotosByActiveUserId() {
    this.appService.getPhotos().subscribe((photos: Photo[]) => {
      this.photos = photos;
      //this.pix = photos;
      this.galleryImages = this.getImages();

      // this.pix = new Array(this.photos.length);
      // for (let i = 0; i < this.photos.length; i++) {
      //     this.pix[i] = this.photos[i];
      // }


      //console.log('pix array loaded? : ', this.pix);
      //this.loadSlideShowArray();
     //console.log('slide show: ', this.slideShowPix);
      //console.log(contacts);
    }, error => {
      console.log(error);
      //this.alertify.error(error);
    });
  }

  //  loadSlideShowArray() {
  //    for (let i = 0; i < this.photos.length; i++) {
  //       this.slideShowPix.push({source: this.photos[i].url});
  //     }
  //    }

  //  post() {
  //  this.model = Object.assign({}, '');

  //  this.appService.postPhotos(this.model).subscribe(() => {
  //    //console.log('added new contact: ', this.contactForm.value);
  //    this.alertify.success('Contact added successfully and is ARMORED!');
  //  }, error => {
  //   this.alertify.error('Error trying to add contact. Check your Internet connection.');
  //  });

  // }
}
