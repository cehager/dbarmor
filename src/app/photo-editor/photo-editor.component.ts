import { Component, OnInit, Input } from "@angular/core";
import { Photo } from "../services/models/Photo";
import { AppRepositoryService } from "../services/apprepository.service";
import { AlertifyService } from "../services/alertify.service";
import {
  NgxGalleryImage,
  NgxGalleryOptions,
  NgxGalleryAnimation,
} from "ngx-gallery";
import { FileUploader } from "ng2-file-upload";
import { SelectItem } from "primeng/api";

@Component({
  selector: "app-photo-editor",
  templateUrl: "./photo-editor.component.html",
  styleUrls: ["./photo-editor.component.scss"],
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

  constructor(
    private appService: AppRepositoryService,
    private alertify: AlertifyService
  ) {}

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
      url:
        "https://mifawghorn20170405015815.azurewebsites.net/dex/" +
        this.appService.activeUserId,
      authToken: "Bearer " + this.appService.userToken,
      isHTML5: true,
      allowedFileType: ["image"],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
    });

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          seqNbr: res.seqNbr,
          userId: res.userId,
          url: res.url,
          createdOn: res.createdOn,
          description: res.description,
          publicId: res.publicId,
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
    if (this.sourcePhotos != null && this.sourcePhotos.length != null) {
      for (let i = 0; i < this.sourcePhotos.length; i++) {
        //if (this.sourcePhotos[i].seqNbr > -1) {
        imageUrls.push({
          small: this.sourcePhotos[i].url,
          medium: this.sourcePhotos[i].url,
          big: this.sourcePhotos[i].url,
          description: this.sourcePhotos[i].description,
        });
        //}
      }
    }
    return imageUrls;
  }

  getPhotosByActiveUserId() {
    this.appService.getPhotos().subscribe(
      (photos: Photo[]) => {
        this.photos = photos;
        this.sourcePhotos = [];
        if (photos != null && photos.length != null) {
          for (let i = 0; i < this.photos.length; i++) {
            if (this.photos[i].seqNbr > -1) {
              this.sourcePhotos.push({
                url: this.photos[i].url,
                seqNbr: this.photos[i].seqNbr,
                description: this.photos[i].description,
                id: this.photos[i].id,
                userId: this.photos[i].userId,
                createdOn: this.photos[i].createdOn,
                publicId: this.photos[i].publicId,
              });
            }
          }
          this.galleryImages = this.getImages();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
