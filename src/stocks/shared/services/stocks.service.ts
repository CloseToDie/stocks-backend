import { Injectable } from '@nestjs/common';
import { StockModel } from '../models/stock.model';

@Injectable()
export class StocksService {
  stocks: StockModel[] = [
    { id: '1', name: 'APPLE', description: 'Apple Stock', price: 2000 },
  ];

  add(stock: StockModel): void {
    this.stocks.push(stock);
  }

  get(id: string): StockModel {
    return this.stocks.find((s) => s.id == id);
  }

  getAll(): StockModel[] {
    return this.stocks;
  }

  increment(id: string): StockModel {
    const stock = this.get(id);
    stock.price++;
    return stock;
  }

  decrement(id: string): StockModel {
    const stock = this.get(id);
    stock.price--;
    return stock;
  }

  delete(id: string): void {
    this.stocks = this.stocks.filter((s) => s.id !== id);
  }
}
