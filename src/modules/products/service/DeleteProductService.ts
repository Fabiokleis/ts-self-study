import AppError from "@shared/errors/AppError";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";
import Product from "../typeorm/entities/Product";
import RedisCache from "@shared/cache/RedisCache";

interface IRequest {
  id: string,
}

class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const product = await ProductRepository.findOneBy({ id });

    if (!product) {
      throw new AppError('Product not found!');
    }

    await RedisCache.invalidade('api-vendas-PRODUCT_LIST');

    await ProductRepository.remove(product);
  }
}

export default DeleteProductService;
