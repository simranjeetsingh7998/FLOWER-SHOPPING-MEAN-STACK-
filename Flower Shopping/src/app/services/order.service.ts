//show orders to admin(florist) to accept order and decrease from stock,update quantity to restock

import { Injectable } from '@angular/core';
import { flowerInterface } from '../model/flower';
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class OrderService {

  private updatedTitleSource = new Subject<string>();
  public updatedTitleObservable = this.updatedTitleSource.asObservable();


  constructor(private http: HttpClient) { }

  public getOrdersFromDB() {
    console.log("In getordersfromdb");
    return this.http.get<flowerInterface[]>('http://localhost:8000/flowerorder');
  }
  public addOrder(order){
    console.log("In addOrder in OrderService");
    return this.http.post('http://localhost:8000/flowerorder/addOrder',order);
  }

  public deleteOrder(flower:flowerInterface){
    return this.http.delete(`http://localhost:8000/flowerorder/deleteOrder/${flower.name}`);
  }
}
