import { Module } from '@nestjs/common';
import { StocksService } from './stocks.service';

@Module({
  providers: [StocksService]
})
export class StocksModule {}
