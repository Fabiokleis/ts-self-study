import { ICreateOrder } from "../models/ICreateOrder";
import { IOrder } from "../models/IOrder";

export interface IOrdersRepository {
  findOneById(id: string): Promise<IOrder | null>;
  createOrder(order: ICreateOrder): Promise<IOrder>;
  remove(product: IOrder): Promise<void>;
}
