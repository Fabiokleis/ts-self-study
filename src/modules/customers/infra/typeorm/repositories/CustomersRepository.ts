import { dataSource } from "@shared/infra/typeorm";
import Customer from "../entities/Customer";
import { ICustomersRespository, SearchParams } from "@modules/customers/domain/repositories/ICustomersRepository";
import { Repository } from "typeorm";
import { ICreateCustomer } from "@modules/customers/domain/models/ICreateCustomer";
import { ICustomer } from "@modules/customers/domain/models/ICustomer";
import { ICustomerPaginate } from "@modules/customers/domain/models/ICustomerPaginate";


class CustomersRepository implements ICustomersRespository {
  private ormRepository: Repository<Customer>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Customer);
  }

  public async findAll({ page, skip, take }: SearchParams): Promise<ICustomerPaginate> {
    const [customers, count] = await this.ormRepository
    .createQueryBuilder()
    .skip(skip)
    .take(take)
    .getManyAndCount();

    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: customers
    };

    return result;
  }

  public async create({ name, email}: ICreateCustomer): Promise<ICustomer> {
    const customer = this.ormRepository.create({ name, email });

    await this.ormRepository.save(customer);
    return customer;
  }

  public async save(customer: ICustomer): Promise<ICustomer> {
    await this.ormRepository.save(customer);
    return customer;
  }

  public async findByName(name: string): Promise<Customer | null> {
    const customer = await this.ormRepository.findOne({
      where: {
        name,
      },
    });
    return customer;
  }

  public async findById(id: string): Promise<Customer | null> {
    const customer = await this.ormRepository.findOne({
      where: {
        id,
      },
    });
    return customer;
  }

  public async findByEmail(email: string): Promise<Customer | null> {
    const customer = await this.ormRepository.findOne({
      where: {
        email,
      },
    });
    return customer;
  }

  public async remove(customer: ICustomer): Promise<void> {
    await this.ormRepository.remove(customer);
  } 
}

export default CustomersRepository;
