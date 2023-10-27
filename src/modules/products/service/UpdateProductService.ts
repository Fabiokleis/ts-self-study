import AppError from "@shared/errors/AppError";
import Product from "../infra/typeorm/entities/Product";
import RedisCache from "@shared/cache/RedisCache";
import { inject, injectable } from "tsyringe";
import { IProductsRepository } from "../domain/repositories/IProductsRepository";
import { IUpdateProduct } from "../domain/models/IUpdateProduct";
import { IFindProducts } from "../domain/models/IFindProducts";


@injectable()
class UpdateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository) {}

  public async execute({ id, name, price, quantity }: IUpdateProduct): Promise<Product> {
    const product = await this.productsRepository.findOneById({ id });

    if (!product) {
      throw new AppError('Product not found!');
    }

    const productExists = await this.productsRepository.findByName(name);

    if (productExists && name != product.name) {
      throw new AppError('Product name already exists.')
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;


    await RedisCache.invalidade('api-vendas-PRODUCT_LIST');
    

    await this.productsRepository.save(product);
    return product;
  }
}

export default UpdateProductService;
