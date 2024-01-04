import { Component } from '@angular/core'; 
declare var $: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ETicaretClient';
}/*
$.get("https://localhost:7194/api/product", function(data:any) {
  console.log(data); // Gelen veriyi konsola yazdır
});*/
