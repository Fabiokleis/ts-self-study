import { dataSource } from "@shared/infra/typeorm";
import Order from "../entities/Order";
import { Repository } from "typeorm";
import { IOrdersRepository } from "@modules/orders/domain/repositories/IOrdersRepository";
import { IOrder } from "@modules/orders/domain/models/IOrder";
import { ICreateOrder } from "@modules/orders/domain/models/ICreateOrder";

class OrdersRepository implements IOrdersRepository {
  private ormRepository: Repository<Order>; 
  
  constructor() {
    this.ormRepository = dataSource.getRepository(Order);
  }
  
  public async remove(order: IOrder): Promise<void> {
    this.ormRepository.remove(order);
  }

  public async findOneById(id: string): Promise<IOrder | null> {
    const order = this.ormRepository.findOne({ 
      where: { id }, 
      relations: ['order_products', 'customer'], 
    });
    return order;
  }

  public async createOrder({ customer, products }: ICreateOrder): Promise<IOrder> {
    const order = this.ormRepository.create({
      customer, order_products: products,
    });

    await this.ormRepository.save(order);

    return order;
  }
}

export default OrdersRepository;
