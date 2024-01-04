import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { Create_Product } from 'src/app/contracts/create_product';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit {

  constructor(spinner:NgxSpinnerService,private httpClientService:HttpClientService) {super(spinner)}

  ngOnInit(): void {
    
  }
  @ViewChild(ListComponent) listComponents:ListComponent;
  createdProduct(createdProduct:Create_Product){
    this.listComponents.getProducts();
  }
}
/*this.httpClientService.post({
      controller:"product"
    },{
      name:"Silgi",
      stock:77,
      price:10
    }).subscribe();*/
/*
    this.httpClientService.get<Create_Product>({
      controller:"product",
    }).subscribe(data=>console.log(data))
    */
 /*
    this.httpClientService.put({
      controller:"product"
    },{
      id:"19c6b013-a276-42be-a33e-64a39a57b2b7",
      name:"Kokulu silgi",
      stock:40,
      price:12
    }).subscribe();*/
    /*
    this.httpClientService.delete({
      controller:"product"
    },"25532941-50ca-4868-84b1-3ed2df4afbbe").subscribe();*/
   