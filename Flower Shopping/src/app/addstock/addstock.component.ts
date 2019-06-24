
import { Component, OnInit } from '@angular/core';
import { StockService } from './../services/stock.service';
import { flowerInterface } from '../model/flower';
import { Router } from '@angular/router'
@Component({
  selector: 'app-addstock',
  templateUrl: './addstock.component.html',
  styleUrls: ['./addstock.component.css']
})
export class AddstockComponent implements OnInit {

  constructor(private stockService:StockService,private router:Router) { }

  ngOnInit() {
  }

  formSubmit(form) {
    let flower: flowerInterface = {
      'name': form.flowerName.value,
      'price': form.flowerPrice.value,
      'quantity':form.flowerQuantity.value
    }
    console.log(`New Flower : ${JSON.stringify(flower)}`);
    this.stockService.addStock(flower).subscribe();
    this.router.navigateByUrl("/admin");
  }
}
