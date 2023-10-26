import AppError from "@shared/errors/AppError";
import { CustomersRepository } from "../typeorm/repositories/CustomersRepository";
import Customer from "../typeorm/entities/Customer";


class ListCustomerService {
  public async execute(): Promise<Customer[]> {
    return CustomersRepository.find();
  }
}

export default ListCustomerService;
