import AppError from "@shared/errors/AppError";
import Product from "../infra/typeorm/entities/Product";
import { IProductsRepository } from "../domain/repositories/IProductsRepository";
import { IFindProducts } from "../domain/models/IFindProducts";
import { inject, injectable } from "tsyringe";

@injectable()
class ShowProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository) {}
  public async execute(id: IFindProducts): Promise<Product | null> {
    const product = await this.productsRepository.findOneById(id);

    if (!product) {
      throw new AppError('Product not found!');
    }

    return product;
  }
}

export default ShowProductService;
