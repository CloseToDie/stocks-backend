import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { StocksService } from './shared/services/stocks.service';
import { Socket } from "socket.io";

@WebSocketGateway()
export class StocksGateway {
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
    @MessageBody() name: string,
    @MessageBody() description: string,
    @MessageBody() price: number,
  ): void {
    const stock = this.stocksService.add(client.id, name, description, price);
    this.server.emit('stock', stock);
  }

  @SubscribeMessage('increment')
  handleIncrement(@MessageBody() id: string): void {
    const stock = this.stocksService.increment(id);
    this.server.emit('stock', stock);
  }

  @SubscribeMessage('decrement')
  handleDecrement(@MessageBody() id: string): void {
    const stock = this.stocksService.decrement(id);
    this.server.emit('stock', stock);
  }
}
