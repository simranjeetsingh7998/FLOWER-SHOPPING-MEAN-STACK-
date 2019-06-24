import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { flowerInterface } from '../model/flower';
import { StockService } from './../services/stock.service';
import { OrderService } from './../services/order.service'
import { EditStockComponent } from './../edit-stock/edit-stock.component'
import { UpperCasePipe } from '@angular/common'
import { Router } from '@angular/router'
import $ = require('jquery');

@Component({
  selector: 'app-admin-comp',
  templateUrl: './admin-comp.component.html',
  styleUrls: ['./admin-comp.component.css']
})
export class AdminCompComponent implements OnInit {

  @ViewChild(EditStockComponent) private editStockComponent: EditStockComponent;
  private flowerName = "Flower Name";
  private flowerPrice = "Price per flower";
  private flowerQuantity = "Quantity Available";

  private currFlower;
  public flowerList;
  private displayEdit = false;
  private txt=false;
  constructor(private stockService: StockService,private orderService:OrderService , private http: HttpClient, private router: Router) { }

  ngOnInit() {
    if (this.router.url == '/admin') {
      this.stockService.getStocksFromDB().subscribe((response) => {
        console.log(`Response from server is ${JSON.stringify(response)}`);
        this.flowerList = response;
        this.txt=false;
      })
    }
    else if (this.router.url == '/order') {
      this.orderService.getOrdersFromDB().subscribe((response) => {
        console.log(`Response from server is ${response}`);
        this.flowerList = response;
        this.txt=true;
      })
    }
    
  }

  public process(flower) {
    if(this.router.url=='/admin'){
      this.currFlower = JSON.parse(JSON.stringify(flower));
      this.displayEdit = !this.displayEdit;
      setTimeout(() => this.editStockComponent.callfromparent(), 500);
    }
    else if(this.router.url=='/order'){
      if(confirm("Process this order for delivery? ")){
        this.orderService.deleteOrder(flower).subscribe();
        this.stockService.decreaseStock(flower).subscribe();
        window.location.reload();
      }
    }
  }

  updateFlower(flower) {
    this.ngOnInit();
  }
}
