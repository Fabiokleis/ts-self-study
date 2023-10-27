import AppError from "@shared/errors/AppError";
import Customer from "../infra/typeorm/entities/Customer";
import { inject, injectable } from "tsyringe";
import { ICustomersRespository } from "../domain/repositories/ICustomersRepository";

interface IRequest {
  id: string;
}

@injectable()
class ShowCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRespository) {}

  public async execute({ id }: IRequest): Promise<Customer> {
    
    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new AppError('customer not found.');
    }

    return customer;
  }
}

export default ShowCustomerService;
