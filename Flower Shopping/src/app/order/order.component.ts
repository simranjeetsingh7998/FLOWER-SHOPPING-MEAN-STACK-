import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { flowerInterface } from '../model/flower';
import { StockService } from './../services/stock.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  private flowerName="Flower Name";
  private flowerPrice="Price per flower";
  private flowerQuantity="Quantity Available";

  private currFlower;
  public flowerList;
  private displayEdit=false;

  constructor(private orderService: OrderService,private stockService:StockService, private http: HttpClient) { }

  ngOnInit() {
    this.orderService.getOrdersFromDB().subscribe((response) => {
      console.log(`Response from server is ${response}`);
      this.flowerList = response;
    })
  }

  processOrder(flower){
    if(confirm("Process this order for delivery? ")){
      this.orderService.deleteOrder(flower).subscribe();
      this.stockService.updateStock(flower).subscribe();
      window.location.reload();
    }
  }
  // HeaderController($scope, $location) 
  // { 
  //     $scope.isActive = function (viewLocation) { 
  //         return viewLocation === $location.path();
  //     };
  // }
  updateFlower(flower){
    this.ngOnInit();
  }
  getTitleStyles() {
    return {
      //'background': 'navy',
      'font-size': '50px',
      'margin-right': 'auto',
      'margin-left': 'auto',
      'width': '50%',
      'text-align': 'center'
    }
  }

}
