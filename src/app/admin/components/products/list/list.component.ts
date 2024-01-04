import { error } from 'console';
import { SpinnerType } from './../../../../base/base.component';
import { AlertifyService, Position, MessageType } from './../../../../services/ui/alertify.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, _MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { List_Product } from 'src/app/contracts/list_product';
import { ProductService } from 'src/app/services/common/models/product.service';
import { MatPaginator } from '@angular/material/paginator';

declare var $:any

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, private productService: ProductService, private alertifyService: AlertifyService) {
    super(spinner)
  }
  
  displayedColumns: string[] = ['name', 'stock', 'price', "createdDate", "updatedDate","edit","delete"];
  dataSource: MatTableDataSource<List_Product> = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  async getProducts(){
    this.showSpinner(SpinnerType.BallSpinClockwase);
    const allProducts: {totalCount:number;products:List_Product[]} | undefined = await this.productService.read(this.paginator?this.paginator.pageIndex:0,this.paginator?this.paginator.pageSize:5, () => this.hideSpinner(SpinnerType.BallSpinClockwase), errorMessage => this.alertifyService.message(errorMessage, {
      messageType: MessageType.Error,
      position: Position.BottomRight,
      delay: 5
    }))
    this.dataSource = new MatTableDataSource<List_Product>(allProducts.products);
    this.paginator.length=allProducts.totalCount
  }

 // delete(id,event){
   // const img:HTMLImageElement=event.srcElement;
    //$(img.parentElement.parentElement).fadeOut(1000)
 // }

  async pageChanged(){
    await this.getProducts();
  }
  async ngOnInit() {
   await this.getProducts();
  }

}
