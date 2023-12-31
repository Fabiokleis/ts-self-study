import AppError from "@shared/errors/AppError";
import { ICustomersRespository } from "../domain/repositories/ICustomersRepository";
import { ICreateCustomer } from "../domain/models/ICreateCustomer";
import { ICustomer } from "../domain/models/ICustomer";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateCustomerService {

  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRespository) {}

  public async execute({ name, email }: ICreateCustomer): Promise<ICustomer> {
    const emailExists = await this.customersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already used.');
    }
    
    const customer = await this.customersRepository.create({
      name,
      email,
    });

    return customer;
  }
}

export default CreateCustomerService;
