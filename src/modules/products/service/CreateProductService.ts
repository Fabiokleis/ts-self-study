import AppError from "@shared/errors/AppError";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";
import Product from "../typeorm/entities/Product";
import RedisCache from "@shared/cache/RedisCache";

interface IRequest {
  name: string,
  price: number,
  quantity: number,
}

class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productExists = await ProductRepository.findByName(name);

    if (productExists) {
      throw new AppError('Product name already exists!');
    }

    const product = ProductRepository.create({ name, price, quantity });

    await RedisCache.invalidade('api-vendas-PRODUCT_LIST');
    await ProductRepository.save(product);

    return product;
  }
}

export default CreateProductService;
