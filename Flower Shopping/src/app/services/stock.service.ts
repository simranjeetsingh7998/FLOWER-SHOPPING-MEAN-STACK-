//populate stock in user panel from stock table. show all flowers with quantities,price and a spinner at the side with 
//submit order button

import { Injectable } from '@angular/core';
import { flowerInterface } from '../model/flower';
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class StockService {

  private updatedTitleSource = new Subject<string>();
  public updatedTitleObservable = this.updatedTitleSource.asObservable();


  constructor(private http: HttpClient) { }

  public getStocksFromDB() {
    console.log("In getStocksFromdb");
    return this.http.get<flowerInterface[]>('http://localhost:8000/stock');
  }
  public addStock(stock){
    console.log("In addStock in StockService");
    return this.http.post('http://localhost:8000/stock/addStock',stock);
  }
  public decreaseStock(flower:flowerInterface){
    return this.http.put(`http://localhost:8000/stock/decreaseStock/${flower.name}`,flower);
  }
  public updateStock(flower:flowerInterface){
    return this.http.put(`http://localhost:8000/stock/updateStock/${flower.name}`,flower);
  }
}
