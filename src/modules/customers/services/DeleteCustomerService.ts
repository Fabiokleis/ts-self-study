import AppError from "@shared/errors/AppError";
import Customer from "../typeorm/entities/Customer";
import { CustomersRepository } from "../typeorm/repositories/CustomersRepository";

interface IRequest {
  id: string;
}

class DeleteCustomerService {
  public async execute({ id }: IRequest): Promise<void> {
    const customer = await CustomersRepository.findById(id);

    if (!customer) {
      throw new AppError('customer not found.');
    }

    await CustomersRepository.remove(customer);
  }
}

export default DeleteCustomerService;
