import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';


export class BaseComponent  {

  constructor(private spinner:NgxSpinnerService) { }

  showSpinner(spinnerNameType:SpinnerType){
    this.spinner.show(spinnerNameType);
    setTimeout(() =>  this.hideSpinner(spinnerNameType),5000);
  }
  hideSpinner(spinnerNameType:SpinnerType){
    this.spinner.hide(spinnerNameType);
  }
}
export enum SpinnerType{
  BallSpinClockwase="s1",
  BallAtom="s2",
  BallScale="s3"
}