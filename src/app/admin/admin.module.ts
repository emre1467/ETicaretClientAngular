import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from './layout/layout.module';
import { ComponentsModule } from './components/components.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LayoutModule,
    ComponentsModule,
  ],
  exports:[
    LayoutModule
  ]
})
export class AdminModule { }
//Eğer bir modül başka bir modülü içerecekse import etmeliyiz
