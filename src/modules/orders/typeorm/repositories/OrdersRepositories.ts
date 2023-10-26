import { dataSource } from "@shared/typeorm";
import Order from "../entities/Order";
import Customer from "@modules/customers/typeorm/entities/Customer";

interface IProduct {
  product_id: string;
  price: number;
  quantity: number;
}

interface IRequest {
  customer: Customer;
  products: IProduct[];
}

export const OrdersRepository = dataSource.getRepository(Order).extend({
  async findById(id: string): Promise<Order | null> {
    const order = this.findOne({ 
      where: { id }, 
      relations: ['orders_products', 'customer'], 
    });
    return order;
  },

  async createOrder({ customer, products }: IRequest): Promise<Order> {
    const order = this.create({
      customer, order_products: products,
    });

    await this.save(order)

    return order;
  }
});
