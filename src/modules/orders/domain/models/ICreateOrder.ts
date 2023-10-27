import { ICustomer } from "@modules/customers/domain/models/ICustomer";
import { ISerializedProduct } from "@modules/products/domain/models/ISerializedProduct";

export interface ICreateOrder {
  customer: ICustomer;
  products: ISerializedProduct[];
}
