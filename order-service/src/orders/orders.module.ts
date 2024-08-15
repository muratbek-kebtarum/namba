import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from './entity/orders.entity';
import {KafkaModule} from "../kafka/kafka.module";

@Module({
  imports: [TypeOrmModule.forFeature([Order]), KafkaModule],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
