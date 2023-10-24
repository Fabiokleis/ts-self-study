import { DataSource } from "typeorm";

import { CreateProducts1698150181921 } from './migrations/1698150181921-CreateProducts';
import Product from "@modules/products/typeorm/entities/Product";

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'apivendas',
  entities: [Product],
  migrations: [
    CreateProducts1698150181921
  ],
});
