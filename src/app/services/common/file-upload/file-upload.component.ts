import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { HttpClientService } from '../http-client.service';
import { AlertifyService, MessageType, Position } from '../../admin/alertify.service';
import { MatDialog } from '@angular/material/dialog';
import { FileUPloadDialogState, FileUploadDialogComponent } from 'src/app/dialogs/file-upload-dialog/file-upload-dialog.component';
import { DialogService } from '../dialog.service';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  constructor(private dialogService:DialogService,private dialog: MatDialog, private httpClientService: HttpClientService, private alertify: AlertifyService) {

  }
  public files: NgxFileDropEntry[];

  @Input() options: Partial<FileUploadOptions>;

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;

    const fileData: FormData = new FormData();
    for (const file of files) {
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        fileData.append(_file.name, _file, file.relativePath)
      })
    }
    this.dialogService.openDialog({
      componentType:FileUploadDialogComponent,
      data:FileUPloadDialogState.Yes,
      afterClosed :() => {
        this.httpClientService.post({
          controller: this.options.controller,
          action: this.options.action,
          queryString: this.options.queryString,
          headers: new HttpHeaders({ "responseType": "blob" })
        }, fileData).subscribe(data => {
          this.alertify.message("Dosya Yükleme Başarılı", {
            messageType: MessageType.Success,
            delay: 3,
            position: Position.TopCenter
          })
        }, (errorResponse: HttpErrorResponse) => {
          this.alertify.message("Dosya Yükleme Başarısız", {
            messageType: MessageType.Error,
            delay: 3,
            position: Position.TopCenter
          })
        })
      }
    })


  }
  /*
  openDialog(afterClosed: any): void {
    const dialogRef = this.dialog.open(FileUploadDialogComponent, {
      data: FileUPloadDialogState.Yes,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == FileUPloadDialogState.Yes)
        afterClosed();

    });
  }*/
}

export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
}