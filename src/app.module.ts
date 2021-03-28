import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StocksModule } from './stocks/stocks.module';
import { StocksGateway } from './stocks/stocks.gateway';

@Module({
  imports: [StocksModule],
  controllers: [AppController],
  providers: [AppService, StocksGateway],
})
export class AppModule {}
