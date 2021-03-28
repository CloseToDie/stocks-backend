import { Injectable } from '@nestjs/common';
import { StockModel } from '../models/stock.model';

@Injectable()
export class StocksService {
  stocks: StockModel[] = [];

  add(
    id: string,
    name: string,
    description: string,
    price: number,
  ): StockModel {
    const stock: StockModel = { id, name, description, price };
    this.stocks.push(stock);
    return stock;
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

  delete(id: string): StockModel[] {
    this.stocks = this.stocks.filter((s) => s.id !== id);
    return this.stocks;
  }
}
