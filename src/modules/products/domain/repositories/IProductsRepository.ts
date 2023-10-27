import { IProduct } from "../models/IProduct";
import { ICreateProduct } from "../models/ICreateProduct";
import { IFindProducts } from "../models/IFindProducts";
import { IProductUpdateQuantity } from "../models/IProductUpdateQuantity";

export interface IProductsRepository {
  findByName(name: string): Promise<IProduct | null>;
  findAllByIds(id: IFindProducts[]): Promise<IProduct[]>;
  find(): Promise<IProduct[]>;
  findOneById(id: IFindProducts): Promise<IProduct | null>;
  create(data: ICreateProduct): Promise<IProduct>;
  save(IProduct: IProduct): Promise<IProduct>;
  updateProductsQuantity(data: IProductUpdateQuantity[]): Promise<void>;
  remove(product: IProduct): Promise<void>;
}
