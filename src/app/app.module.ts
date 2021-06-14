import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule,ReactiveFormsModule  }   from '@angular/forms';
import {ModalComponent} from './app-modal/app.modal.component';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { AgmCoreModule } from '@agm/core';
import { AgmOverlays } from "agm-overlays";

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule ,
    HttpClientModule,
    AgmOverlays,
    AgmCoreModule.forRoot({
                            apiKey: ''
                          }),
    ModalModule.forRoot()
  ],
  providers: [BsModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
