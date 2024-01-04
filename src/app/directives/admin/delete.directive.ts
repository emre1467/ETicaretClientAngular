import { error } from 'console';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageType } from './../../services/ui/alertify.service';
import { Directive, ElementRef, Output, HostListener, Renderer2, Input, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { DeleteDialogComponent } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { AlertifyService, Position } from 'src/app/services/admin/alertify.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { DialogService } from 'src/app/services/common/dialog.service';
declare var $:any;

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(
    private dialogService:DialogService,
    public dialog: MatDialog,
    private spinner:NgxSpinnerService,
    private alertify:AlertifyService,
    private element: ElementRef,
    private _renderer: Renderer2,
    private httpClientService:HttpClientService) {
    const img = _renderer.createElement("img");
    img.setAttribute("src", "../../../../../assets/delete.png");
    img.setAttribute("style", "cursor:pointer");
    img.width = 25;
    img.height = 25;
    _renderer.appendChild(element.nativeElement,img);
  }

  @Input() id:string; 
  @Input() controller:string;
  @Output() callback:EventEmitter<any>=new EventEmitter();

  @HostListener("click")
  async onClick(){
    this.dialogService.openDialog({
      componentType:DeleteDialogComponent,
      data:DeleteState.Yes,
      afterClosed:async()=>{
        this.spinner.show(SpinnerType.BallSpinClockwase);
        const td:HTMLTableCellElement=this.element.nativeElement;
        this.httpClientService.delete({
          controller:this.controller
        },this.id).subscribe(data=>{
          $(td.parentElement).fadeOut(1000,()=>{
            this.callback.emit();
            this.alertify.message("Ürün Başarıyla Silinmiştir",{
              messageType:MessageType.Success,
              position:Position.TopRight,
              delay:3
            })
          })
        },(errorResponse:HttpErrorResponse)=>{
          this.spinner.hide(SpinnerType.BallSpinClockwase)
          this.alertify.message("Ürün Silinemedi",{
            messageType:MessageType.Error,
            position:Position.TopRight,
            delay:3
          })
        });
       
      }
    })
    
  }

  
}

export enum DeleteState{
  Yes,No
}
