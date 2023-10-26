import { DataSource } from "typeorm";

import { CreateProducts1698150181921 } from './migrations/1698150181921-CreateProducts';
import { CreateUsers1698166179981 } from "./migrations/1698166179981-CreateUsers";
import { CreateUserTokens1698251060857 } from "./migrations/1698251060857-CreateUserTokens";
import Product from "@modules/products/typeorm/entities/Product";
import User from "@modules/users/typeorm/entities/User";
import UserToken from "@modules/users/typeorm/entities/UserToken";

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'apivendas',
  entities: [Product, User, UserToken],
  migrations: [
    CreateProducts1698150181921,
    CreateUsers1698166179981,
    CreateUserTokens1698251060857
  ],
  synchronize: true
});
