import AppError from "@shared/errors/AppError";
import { CustomersRepository } from "../typeorm/repositories/CustomersRepository";
import Customer from "../typeorm/entities/Customer";

interface IRequest {
  id: string;
  name: string;
  email: string;
}

class UpdateCustomerService {
  public async execute({ 
    id, 
    name,
    email,
  }: IRequest): Promise<Customer> {
    const customer = await CustomersRepository.findById(id);

    if (!customer) {
      throw new AppError('customer not found.');
    }

    const customerExists = await CustomersRepository.findByEmail(email);

    if (customerExists && email !== customer.email) {
      throw new AppError('This email already exists.');
    }

    customer.name = name;
    customer.email = email;

    await CustomersRepository.save(customer);

    return customer;
  }
}

export default UpdateCustomerService;
