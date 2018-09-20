import { Component, OnInit } from '@angular/core';
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';

const url = 'http://localhost:3000/upload';

@Component({
  selector: 'image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {

  constructor(){}

  public uploader: FileUploader = new FileUploader({url: url, itemAlias: 'photo'});

  ngOnInit(){

    this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
      form.append('userId', localStorage.getItem('senderId'));
    }

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };

    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      console.log("ImageUpload:uploaded:", item, status, response);
      console.log(this.uploader);
    };

  }

}
