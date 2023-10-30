import Customer from "../infra/typeorm/entities/Customer";
import { inject, injectable } from "tsyringe";
import { ICustomersRespository } from "../domain/repositories/ICustomersRepository";
import { ICustomerPaginate } from "../domain/models/ICustomerPaginate";


interface SearchParams {
  page: number;
  limit: number;
}

@injectable()
class ListCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRespository) {}

  public async execute({ page, limit }: SearchParams): Promise<ICustomerPaginate> {
    const take = limit;
    const skip = (Number(page) - 1) * take;
    const customers = this.customersRepository.findAll({ page, skip, take });
    return customers;
  }
}

export default ListCustomerService;
