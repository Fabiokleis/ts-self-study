import { dataSource } from "@shared/typeorm";
import Product from "../entities/Product";


export const ProductRepository = dataSource.getRepository(Product).extend({
  async findByName(name: string): Promise<Product | null> {
    const product = await this.findOne({
      where: {
        name,
      },
    });
    return product;
  }
});
