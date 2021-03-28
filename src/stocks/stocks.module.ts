import { Module } from '@nestjs/common';
import { StocksService } from './shared/services/stocks.service';

@Module({
  providers: [StocksService]
})
export class StocksModule {}
