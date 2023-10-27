import AppError from "@shared/errors/AppError";
import RedisCache from "@shared/cache/RedisCache";
import { ICreateProduct } from "../domain/models/ICreateProduct";
import { IProduct } from "../domain/models/IProduct";
import { inject, injectable } from "tsyringe";
import { IProductsRepository } from "../domain/repositories/IProductsRepository";

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository) {}

  public async execute({ name, price, quantity }: ICreateProduct): Promise<IProduct> {
    const productExists = await this.productsRepository.findByName(name);

    if (productExists) {
      throw new AppError('Product name already exists!');
    }

    const product = await this.productsRepository.create({ name, price, quantity });

    await RedisCache.invalidade('api-vendas-PRODUCT_LIST');

    return product;
  }
}

export default CreateProductService;
