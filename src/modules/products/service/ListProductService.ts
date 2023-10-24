import AppError from "@shared/errors/AppError";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";
import Product from "../typeorm/entities/Product";

class ListProductService {
  public async execute(): Promise<Product[]> {
    return ProductRepository.find();
  }
}

export default ListProductService;
