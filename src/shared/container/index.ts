import { container } from "tsyringe";

import { ICustomersRespository } from "@modules/customers/domain/repositories/ICustomersRepository";
import CustomersRepository from "@modules/customers/infra/typeorm/repositories/CustomersRepository";
import { IProductsRepository } from "@modules/products/domain/repositories/IProductsRepository";
import ProductsRepository from "@modules/products/infra/typeorm/repositories/ProductsRepository";
import { IOrdersRepository } from "@modules/orders/domain/repositories/IOrdersRepository";
import OrdersRepository from "@modules/orders/infra/typeorm/repositories/OrdersRepositories";
import { IUsersRepository } from "@modules/users/domain/repositories/IUsersRepository";
import UsersRepository from "@modules/users/infra/typeorm/repositories/UsersRepository";
import { IUserTokenRepository } from "@modules/users/domain/repositories/IUserTokenRepository";
import UserTokenRepository from "@modules/users/infra/typeorm/repositories/UserTokenRepository";

container.registerSingleton<ICustomersRespository>('CustomersRepository', CustomersRepository);
container.registerSingleton<IProductsRepository>('ProductsRepository', ProductsRepository);
container.registerSingleton<IOrdersRepository>('OrdersRepository', OrdersRepository);
container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);
container.registerSingleton<IUserTokenRepository>('UserTokenRepository', UserTokenRepository);
