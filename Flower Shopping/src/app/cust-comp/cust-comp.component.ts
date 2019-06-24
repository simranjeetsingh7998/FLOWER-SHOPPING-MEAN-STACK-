import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { StockService } from './../services/stock.service';
import { flowerInterface } from '../model/flower';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-cust-comp',
  templateUrl: './cust-comp.component.html',
  styleUrls: ['./cust-comp.component.css']
})
export class CustCompComponent implements OnInit {

  private flowerName="Flower Name";
  private flowerPrice="Price per flower";
  private flowerQuantity="Quantity Available";
  private orderQuantity = "Order Quantity";

  constructor(private stockService: StockService,private orderService:OrderService, private http: HttpClient) { }

  private currFlower;
  public flowerList;
  public orderList;
  private displayEdit=false;

  ngOnInit() {
    this.stockService.getStocksFromDB().subscribe((response) => {
      console.log(`Response from server is ${response}`);
      this.flowerList = response;
    })
  }
  submitOrder(){
    let err=1,totalPrice=0;
    if(confirm("Are you sure to place this order ? ")){
        for(let flower of this.flowerList){
            if(flower.isChecked){
              if(flower.orderQuan<=0 || flower.orderQuan>=flower.quantity){
                alert("Selected quantity not available");
                err=1;
                break;
              }
              err=0;
              console.log("Adding order : "+ flower.name + " quantity : "+flower.orderQuan);
              totalPrice+=flower.price*flower.orderQuan;
              var newFlower : flowerInterface={
                'name':flower.name,
                'price':flower.price,
                'quantity':flower.orderQuan
              }
              this.orderService.addOrder(newFlower).subscribe();
            }
        }
          
    }
    else if(err){
          alert("Order Cancelled");
          this.ngOnInit();
    }
    if(err==0) alert(`You need to pay Rs. ${totalPrice} at delivery.`);
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
