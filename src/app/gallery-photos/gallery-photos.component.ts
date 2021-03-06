import { Component, OnInit } from '@angular/core';
import { NgxGalleryImage, NgxGalleryOptions, NgxGalleryAnimation } from 'ngx-gallery';
import { AppRepositoryService } from '../services/apprepository.service';
import { Photo } from '../services/models/Photo';

@Component({
  selector: 'app-gallery-photos',
  templateUrl: './gallery-photos.component.html',
  styleUrls: ['./gallery-photos.component.scss']
})
export class GalleryPhotosComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  photos: Photo[];
  baseUrl: string;
  imageUrls = [];

  constructor(private appService: AppRepositoryService) {
   }

  ngOnInit() {
    this.baseUrl = this.appService.getApiBasePath();
     this.galleryOptions = [
            {
                width: '100%',
                height: '1000px',
                imageAutoPlay: false,
                imageAutoPlayInterval: 4000,
                previewCloseOnEsc: true,
                previewCloseOnClick: true,
                thumbnailsColumns: 4,
                // previewAutoPlay: true,
                // previewAutoPlayInterval: 2000,
                previewAutoPlayPauseOnHover: true,
                imageAnimation: NgxGalleryAnimation.Slide
            },
            // max-width 800
            {
                breakpoint: 800,
                width: '100%',
                height: '900px',
                imagePercent: 80,
                thumbnailsPercent: 20,
                thumbnailsMargin: 20,
                thumbnailMargin: 20,
                          },
            // max-width 400
            {
                breakpoint: 400,
                preview: false
            }
        ];
    this.getPhotosByActiveUserId();
  }

  // getImages() {
  //   //const imageUrls = [];
  //   for (let i = 0; i < this.photos.length; i++) {
  //     this.imageUrls.push({
  //       small: this.photos[i].url,
  //       medium: this.photos[i].url,
  //       big: this.photos[i].url,
  //       description: this.photos[i].description
  //     });
  //   }
  //   return this.imageUrls;
  // }

   getPhotosByActiveUserId() {
    this.appService.getPhotos().subscribe((photos: Photo[]) => {
      for (let photo of photos) {
        if (photo.seqNbr > -1) {
        //console.log(photo);
        this.imageUrls.push({
          small: photo.url,
          medium: photo.url,
          big: photo.url,
          description: photo.description
        });
      }
    }

      this.galleryImages = this.imageUrls; //this.getImages();
      console.log('gallery images: ', this.galleryImages);
    }, error => {
      console.log(error);
      //this.alertify.error(error);
    });
  }

}
