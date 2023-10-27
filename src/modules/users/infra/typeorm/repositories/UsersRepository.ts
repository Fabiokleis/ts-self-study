import { dataSource } from "@shared/infra/typeorm";
import User from "../entities/User";
import { Repository } from "typeorm";
import { IUser } from "@modules/users/domain/models/IUser";
import { IUsersRepository } from "@modules/users/domain/repositories/IUsersRepository";
import { ICreateUser } from "@modules/users/domain/models/ICreateUser";


class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = dataSource.getRepository(User);
  }

  public async create(user: ICreateUser): Promise<IUser> {
    const userCreated = this.ormRepository.create(user);
    await this.ormRepository.save(userCreated);
    return userCreated;
  }

  public async save(user: IUser): Promise<void> {
    this.ormRepository.save(user);
  }

  public async find(): Promise<IUser[]> {
    return await this.ormRepository.find();
  }

  public async findByName(name: string): Promise<User | null> {
    const user = await this.ormRepository.findOne({
      where: {
        name,
      },
    });
    return user;
  }

  public async findOneById(id: string): Promise<IUser | null> {
    const user = await this.ormRepository.findOne({
      where: {
        id,
      },
    });
    return user;
  }

  public async findByEmail(email: string): Promise<IUser | null> {
    const user = await this.ormRepository.findOne({
      where: {
        email,
      },
    });
    return user;
  }
}

export default UsersRepository;
