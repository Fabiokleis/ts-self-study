import { DataSource } from "typeorm";

import { CreateProducts1698150181921 } from './migrations/1698150181921-CreateProducts';
import { CreateUsers1698166179981 } from "./migrations/1698166179981-CreateUsers";
import { CreateUserTokens1698251060857 } from "./migrations/1698251060857-CreateUserTokens";
import Product from "@modules/products/infra/typeorm/entities/Product";
import User from "@modules/users/infra/typeorm/entities/User";
import UserToken from "@modules/users/infra/typeorm/entities/UserToken";
import { CreateCustomers1698328142954 } from "./migrations/1698328142954-CreateCustomers";
import Customer from "@modules/customers/infra/typeorm/entities/Customer";
import { CreateOrders1698331533828 } from "./migrations/1698331533828-CreateOrders";
import { AddCustomerIdToOrders1698331662960 } from "./migrations/1698331662960-AddCustomerIdToOrders";
import { CreateOrdersProducts1698332049682 } from "./migrations/1698332049682-CreateOrdersProducts";
import { AddOrderIdToOrdersProducts1698332190669 } from "./migrations/1698332190669-AddOrderIdToOrdersProducts";
import { AddProductIdToOrdersProducts1698332361876 } from "./migrations/1698332361876-AddProductIdToOrdersProducts";
import Order from "@modules/orders/infra/typeorm/entities/Order";
import OrdersProducts from "@modules/orders/infra/typeorm/entities/OrdersProducts";

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'apivendas',
  entities: [Product, User, UserToken, Customer, Order, OrdersProducts],
  migrations: [
    CreateProducts1698150181921,
    CreateUsers1698166179981,
    CreateUserTokens1698251060857,
    CreateCustomers1698328142954,
    CreateOrders1698331533828,
    AddCustomerIdToOrders1698331662960,
    CreateOrdersProducts1698332049682,
    AddOrderIdToOrdersProducts1698332190669,
    AddProductIdToOrdersProducts1698332361876,
  ],
  synchronize: true
});
