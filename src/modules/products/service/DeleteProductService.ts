import AppError from "@shared/errors/AppError";
import RedisCache from "@shared/cache/RedisCache";
import { inject, injectable } from "tsyringe";
import { IProductsRepository } from "../domain/repositories/IProductsRepository";
import { IFindProducts } from "../domain/models/IFindProducts";


@injectable()
class DeleteProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository) {}
  public async execute(id: IFindProducts): Promise<void> {
    const product = await this.productsRepository.findOneById(id);

    if (!product) {
      throw new AppError('Product not found!');
    }

    await RedisCache.invalidade('api-vendas-PRODUCT_LIST');

    await this.productsRepository.remove(product);
  }
}

export default DeleteProductService;
