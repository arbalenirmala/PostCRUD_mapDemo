import { Component, OnInit, TemplateRef  } from '@angular/core';
import {ConfigService} from './config.service';
import { FormControl , FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
declare const google: any
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'demo-project';
  public dataObj:any;
  public imgURL:any;
  public specificData:any;
  public updateID:any;
  public isCreateFormShow:boolean =false;
  public updateCallBtn:boolean=false;
  public err :any;
  public isDisplayModal:boolean=false;

  imageForm = new FormGroup({
    titleValue: new FormControl(''),
    contentValue: new FormControl(''),
    latValue: new FormControl(''),
    longValue: new FormControl(''),
    imgURLValue: new FormControl(''),

  });
  public modalRef?: BsModalRef;
constructor (private configService:ConfigService , private modalService: BsModalService){

}
ngOnInit(){
 this.configService.getList().subscribe((data) =>{
    this.dataObj=data;
   })
}

showData(id:any){
  this.configService.getImage(id).subscribe((data) =>{
        this.specificData=data;
        this.specificData.lat=parseFloat(this.specificData.lat);
         this.specificData.long=parseFloat(this.specificData.long);

     })
  }

  submitCall(template: TemplateRef<any>){
    let newEntry={
      title:this.imageForm.get('titleValue')?.value,
      content:this.imageForm.get('contentValue')?.value,
      lat: this.imageForm.get('latValue')?.value,
      long: this.imageForm.get('longValue')?.value,
      image_url: this.imageForm.get('imgURLValue')?.value
    };

    this.configService.createNew(newEntry).subscribe(
    (data) =>{
        this.isDisplayModal=true;
        this.openModal(template);
      },
      (error) =>{
        this.err =error;
      }
      )
  }

  updateData(data:any){
    console.error(data);
    this.updateCallBtn=true;
    this.isCreateFormShow=true;
    this.updateID=data.id;
    this.imageForm.get('titleValue')?.setValue(data.title);
    this.imageForm.get('contentValue')?.setValue(data.content),
    this.imageForm.get('latValue')?.setValue(data.lat),
    this.imageForm.get('longValue')?.setValue(data.long),
    this.imageForm.get('imgURLValue')?.setValue(data.image_url)
  }

  updateDataCall(){

  let updateRec={
        title:this.imageForm.get('titleValue')?.value,
        content:this.imageForm.get('contentValue')?.value,
        lat: this.imageForm.get('latValue')?.value,
        long: this.imageForm.get('longValue')?.value,
        image_url: this.imageForm.get('imgURLValue')?.value
      };

   this.configService.updateReq(updateRec, this.updateID).subscribe((data)=>{
   },
   (error) =>{
    this.err =error
   })
  }

  deleteData(id:any , template:TemplateRef<any>){
      this.configService.deleteReq(id).subscribe(
      (data) =>{
          this.openModal(template)
       },
       (error)=>{
        this.err=error;
       })
  }

  enableForm(){
    this.isCreateFormShow=true;
  }

  openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
     }

     hide(){
        this.modalService.hide();
        this.configService.getList().subscribe((data) =>{
            this.dataObj=data;
           })
     }
}
