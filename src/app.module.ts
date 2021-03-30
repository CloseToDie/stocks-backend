import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StocksModule } from './stocks/stocks.module';
import { StocksGateway } from './stocks/stocks.gateway';
import { StocksService } from './stocks/shared/services/stocks.service';

@Module({
  imports: [StocksModule],
  controllers: [AppController],
  providers: [AppService, StocksService, StocksGateway],
})
export class AppModule {}
