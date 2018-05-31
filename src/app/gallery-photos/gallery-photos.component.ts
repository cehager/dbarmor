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
      console.log('gallery images: ', this.galleryImages);
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
