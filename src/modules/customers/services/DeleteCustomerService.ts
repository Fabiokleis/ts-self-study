import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { ICustomersRespository } from "../domain/repositories/ICustomersRepository";

interface IRequest {
  id: string;
}

@injectable()
class DeleteCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRespository) {}

  public async execute({ id }: IRequest): Promise<void> {
    
    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new AppError('customer not found.');
    }

    await this.customersRepository.remove(customer);
  }
}

export default DeleteCustomerService;
