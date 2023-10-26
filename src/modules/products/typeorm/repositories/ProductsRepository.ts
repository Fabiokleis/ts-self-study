import { dataSource } from "@shared/typeorm";
import Product from "../entities/Product";
import { In } from "typeorm";


interface IFindProducts {
  id: string;
}

export const ProductRepository = dataSource.getRepository(Product).extend({
  async findByName(name: string): Promise<Product | null> {
    const product = await this.findOne({
      where: {
        name,
      },
    });
    return product;
  },

  async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
    const productsIds = products.map(product => product.id);

    const existsProducts = await this.find({
      where: {
        id: In(productsIds),
      }
    });

    return existsProducts;
  }
});
