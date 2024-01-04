import { Observable ,firstValueFrom} from 'rxjs';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { Injectable } from '@angular/core';
import { Create_Product } from 'src/app/contracts/create_product';
import { error } from 'console';
import { HttpErrorResponse } from '@angular/common/http';
import { List_Product } from 'src/app/contracts/list_product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService: HttpClientService) { }

  create(product: Create_Product, successCallBack?: any, errorCallBack?: (errorMessage: string) => void) {
    this.httpClientService.post({
      controller: "product",
    },
      product
    ).subscribe(result => {
      successCallBack();
    }, (errorResponse: HttpErrorResponse) => {
      const _error: Array<{ key: string, value: Array<string> }> = errorResponse.error;
      let message = "";
      _error.forEach((value, index) => {
        value.value.forEach((_v, _index) => {
          message += `${_v}<br>`
        })
      })
      errorCallBack!(message);
    });
  }
  async read(page: number = 0, size: number = 5, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{totalCount:number;products:List_Product[]} > {
    const promiseData: Promise<{totalCount:number;products:List_Product[]}> = this.httpClientService.get<{totalCount:number;products:List_Product[]}>({
      controller: "product",
      queryString: `page=${page}&size=${size}`
    }).toPromise();
    promiseData.then(d => {
      if (successCallBack) {
        successCallBack();
      }
    }).catch((errorResponse: HttpErrorResponse) => {
      if (errorCallBack) {
        errorCallBack(errorResponse.message);
      }
    })
    return await promiseData
  }

  async delete(id:string){
    const deleteObservable:Observable<any>= this.httpClientService.delete<any>({
      controller:"product"
    },id)
    await firstValueFrom(deleteObservable)
  }

}
