import { Injectable } from '@nestjs/common';
import {OnEvent} from "@nestjs/event-emitter";

@Injectable()
export class AppService {
  @OnEvent('order_created')
  handleOrderCreatedEvent(payload: any) {
  console.log('Order Created:', payload);
}

  @OnEvent('order_updated')
  handleOrderUpdatedEvent(payload: any) {
    console.log('Order Updated:', payload);
  }
}
