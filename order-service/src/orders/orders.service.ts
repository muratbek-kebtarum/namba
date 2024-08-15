import {Inject, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entity/orders.entity';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private ordersRepository: Repository<Order>,
        @Inject('KAFKA_SERVICE') private kafkaService: ClientKafka,
    ) {}

    async create(order: Partial<Order>): Promise<Order> {
        const newOrder = this.ordersRepository.create(order);
        const savedOrder = await this.ordersRepository.save(newOrder);
        this.kafkaService.emit('order_created', savedOrder);
        return savedOrder;
    }

    async update(id: number, order: Partial<Order>): Promise<Order> {
        await this.ordersRepository.update(id, order);
        const updatedOrder = await this.findOne(id);
        this.kafkaService.emit('order_updated', updatedOrder);
        return updatedOrder;
    }

    findAll(): Promise<Order[]> {
        return this.ordersRepository.find();
    }

    findOne(id: number): Promise<Order> {
        return this.ordersRepository.findOne({where: {id}});
    }

    async remove(id: number): Promise<void> {
        await this.ordersRepository.delete(id);
    }
}
