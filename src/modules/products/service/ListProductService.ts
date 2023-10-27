import { inject, injectable } from "tsyringe";
import Product from "../infra/typeorm/entities/Product";
import RedisCache from "@shared/cache/RedisCache";
import { IProductsRepository } from "../domain/repositories/IProductsRepository";

@injectable()
class ListProductService {

  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository) {}

  public async execute(): Promise<Product[]> {

    let products = await RedisCache.recover<Product[]>('api-vendas-PRODUCT_LIST');

    if (!products) {
      products = await this.productsRepository.find();
      await RedisCache.save('api-vendas-PRODUCT_LIST', products);
    }

    return products;
  }
}

export default ListProductService;
