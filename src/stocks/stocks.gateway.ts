import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { StocksService } from './shared/services/stocks.service';
import { Socket } from "socket.io";

@WebSocketGateway()
export class StocksGateway {
  constructor(private stocksService: StocksService) {}
  @WebSocketServer() server;

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }

  @SubscribeMessage('add')
  handleAdd(
    @ConnectedSocket() client: Socket,
    @MessageBody() name: string,
    @MessageBody() description: string,
    @MessageBody() price: number,
  ): void {
    const stock = this.stocksService.add(client.id, name, description, price);
    this.server.emit('stockAdded', stock);
  }

  @SubscribeMessage('increment')
  handleIncrement(@MessageBody() id: string): void {
    const stock = this.stocksService.increment(id);
    this.server.emit('stockIncremented', stock);
  }

  @SubscribeMessage('decrement')
  handleDecrement(@MessageBody() id: string): void {
    const stock = this.stocksService.decrement(id);
    this.server.emit('stockDecremented', stock);
  }
}
