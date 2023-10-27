import { dataSource } from "@shared/infra/typeorm";
import Product from "../entities/Product";
import { In, Repository } from "typeorm";
import { IFindProducts } from "@modules/products/domain/models/IFindProducts";
import { IProductsRepository } from "@modules/products/domain/repositories/IProductsRepository";
import { IProduct } from "@modules/products/domain/models/IProduct";
import { ICreateProduct } from "@modules/products/domain/models/ICreateProduct";
import { IProductUpdateQuantity } from "@modules/products/domain/models/IProductUpdateQuantity";


class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>; 
  
  constructor() {
    this.ormRepository = dataSource.getRepository(Product);
  }

  public async create({ name, price, quantity}: ICreateProduct): Promise<IProduct> {
    const product = this.ormRepository.create({ name, price, quantity });

    await this.ormRepository.save(product);
    return product;
  }

  public async save(product: IProduct): Promise<IProduct> {
    await this.ormRepository.save(product);
    return product;
  }
  
  public async updateProductsQuantity(data: IProductUpdateQuantity[]): Promise<void> {
    await this.ormRepository.save(data);
  }

  public async find(): Promise<IProduct[]> {
    const products = await this.ormRepository.find();
    return products;
  }
  
  public async findByName(name: string): Promise<Product | null> {
    const product = await this.ormRepository.findOne({
      where: {
        name,
      },
    });
    return product;
  }

  public async findOneById(id: IFindProducts): Promise<IProduct | null> {
    const product = await this.ormRepository.findOneBy(id);
    return product;
  }

  public async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
    const productsIds = products.map(product => product.id);

    const existsProducts = await this.ormRepository.find({
      where: {
        id: In(productsIds),
      }
    });

    return existsProducts;
  }

  public async remove(product: IProduct): Promise<void> {
    await this.ormRepository.remove(product);
  }

}

export default ProductsRepository;
