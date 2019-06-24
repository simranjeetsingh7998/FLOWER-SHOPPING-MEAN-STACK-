import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StockService } from './../services/stock.service';
import { flowerInterface } from '../model/flower';
@Component({
  selector: 'app-edit-stock',
  templateUrl: './edit-stock.component.html',
  styleUrls: ['./edit-stock.component.css']
})
export class EditStockComponent implements OnInit {

  @Input() selectedFlower;
  @Output() bookUpdated = new EventEmitter();

  constructor(private stockService : StockService) { }

  ngOnInit() {
  }

  callfromparent() {
    console.log("Called from parent");
  }
  
  updateToParent() {
    console.log(`Output object : ${JSON.stringify(this.selectedFlower)}`);
    this.bookUpdated.emit(this.selectedFlower);
  }

  formSubmit(form) {
    let flower: flowerInterface = {
      'name': form.flowerName.value,
      'price': form.flowerPrice.value,
      'quantity':form.flowerQuantity.value
    }
    console.log(`Flower to update : ${JSON.stringify(flower)}`);
    this.stockService.updateStock(flower).subscribe();
    window.location.reload();
  }
}
