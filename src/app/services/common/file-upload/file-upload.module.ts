import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { FileUploadDialogComponent } from 'src/app/dialogs/file-upload-dialog/file-upload-dialog.component';
import { DialogModule } from 'src/app/dialogs/dialog.module';



@NgModule({
  declarations: [
    FileUploadComponent,
  ],
  imports: [
    CommonModule,
    NgxFileDropModule,
    DialogModule
  ],
  exports:[
    FileUploadComponent
  ]
})
export class FileUploadModule { }
