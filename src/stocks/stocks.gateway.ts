import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { StocksService } from './shared/services/stocks.service';
import { Socket } from 'socket.io';
import { StockModel } from './shared/models/stock.model';
import { AddStockDto } from './shared/dto/addStock.dto';
import { uuid } from 'uuidv4';

@WebSocketGateway()
export class StocksGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private stocksService: StocksService) {}
  @WebSocketServer() server;

  @SubscribeMessage('get')
  handleGet(@MessageBody() id: string): void {
    const stock = this.stocksService.get(id);
    this.server.emit('stock', stock);
  }

  @SubscribeMessage('getAll')
  handleGetAll(): void {
    const stocks = this.stocksService.getAll();
    this.server.emit('stocks', stocks);
  }

  @SubscribeMessage('add')
  handleAdd(
    @ConnectedSocket() client: Socket,
    @MessageBody() stock: AddStockDto,
  ): void {
    const addedStock: StockModel = {
      id: uuid(),
      name: stock.name,
      description: stock.description,
      price: stock.price,
    };
    this.stocksService.add(addedStock);
    this.server.emit('stocks', this.stocksService.getAll());
  }

  @SubscribeMessage('increment')
  handleIncrement(@MessageBody() id: string): void {
    const stock = this.stocksService.increment(id);
    this.server.emit('stocks', this.stocksService.getAll());
  }

  @SubscribeMessage('decrement')
  handleDecrement(@MessageBody() id: string): void {
    const stock = this.stocksService.decrement(id);
    this.server.emit('stocks', this.stocksService.getAll());
  }

  handleConnection(client: Socket, ...args: any[]): any {
    console.log('Client Connect', client.id);
    client.emit('stocks', this.stocksService.getAll());
  }

  handleDisconnect(client: Socket): any {
    console.log('Client Disconnect', client.id);
  }
}
