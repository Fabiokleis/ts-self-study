import AppError from "@shared/errors/AppError";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";
import Product from "../typeorm/entities/Product";

interface IRequest {
  id: string,
  name: string,
  price: number,
  quantity: number,
}

class UpdateProductService {
  public async execute({ id, name, price, quantity }: IRequest): Promise<Product> {
    const product = await ProductRepository.findOneBy({ id });

    if (!product) {
      throw new AppError('Product not found!');
    }

    const productExists = await ProductRepository.findByName(name);

    if (productExists && name != product.name) {
      throw new AppError('Product name already exists.')
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await ProductRepository.save(product);
    return product;
  }
}

export default UpdateProductService;
