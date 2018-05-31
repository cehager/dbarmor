import { Component, OnInit, Input } from '@angular/core';
import { Photo } from '../services/models/Photo';
import { AppRepositoryService } from '../services/apprepository.service';
import { AlertifyService } from '../services/alertify.service';
import { NgxGalleryImage, NgxGalleryOptions, NgxGalleryAnimation } from 'ngx-gallery';
import { FileUploader } from 'ng2-file-upload';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.scss']
})
export class PhotoEditorComponent implements OnInit {
   //@Input() photos: Photo[];
   photos: Photo[];
   targetPhotos: Photo[];
   sourcePhotos: Photo[];
   galleryOptions: NgxGalleryOptions[];
   galleryImages: NgxGalleryImage[];
   uploader: FileUploader;
   hasBaseDropZoneOver = false;
   baseUrl: string;
   model: any = {};
   slideShowPix: any[] = [];
   //pix: Photo[];
   //selectedpix: Photo[];
   selectedValues: number[] = [];

   constructor(private appService: AppRepositoryService, private alertify: AlertifyService ) {}

   ngOnInit() {
     this.initializeUploader();
     this.baseUrl = this.appService.getApiBasePath();
     this.getPhotosByActiveUserId();
     this.targetPhotos = [];
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

         this.sourcePhotos.push(photo);
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
       this.sourcePhotos = photos;
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


}
