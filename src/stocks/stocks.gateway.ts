import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { StocksService } from './stocks.service';

@WebSocketGateway()
export class StocksGateway {
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
}
