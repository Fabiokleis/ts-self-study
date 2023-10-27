import AppError from "@shared/errors/AppError";
import CustomersRepository from "../infra/typeorm/repositories/CustomersRepository";
import Customer from "../infra/typeorm/entities/Customer";
import { inject, injectable } from "tsyringe";
import { ICustomersRespository } from "../domain/repositories/ICustomersRepository";

interface IPaginateCustomer {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number | null;
  next_page: number| null;
  last_page: number;
  data: Customer[];
}

@injectable()
class ListCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRespository) {}

  public async execute(): Promise<IPaginateCustomer> {

    // TODO: remover o pagination
    const customers = this.customersRepository.createQueryBuilder('customers').paginate();
    

    return customers as IPaginateCustomer;
  }
}

export default ListCustomerService;
