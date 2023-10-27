import AppError from "@shared/errors/AppError";
import Customer from "../infra/typeorm/entities/Customer";
import { inject, injectable } from "tsyringe";
import { ICustomersRespository } from "../domain/repositories/ICustomersRepository";

interface IRequest {
  id: string;
  name: string;
  email: string;
}

@injectable()
class UpdateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRespository) {}

  public async execute({ 
    id, 
    name,
    email,
  }: IRequest): Promise<Customer> {
    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new AppError('customer not found.');
    }

    const customerExists = await this.customersRepository.findByEmail(email);

    if (customerExists && email !== customer.email) {
      throw new AppError('This email already exists.');
    }

    customer.name = name;
    customer.email = email;

    await this.customersRepository.save(customer);

    return customer;
  }
}

export default UpdateCustomerService;
