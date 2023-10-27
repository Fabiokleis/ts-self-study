import { dataSource } from "@shared/infra/typeorm";
import UserToken from "../entities/UserToken";
import { Repository } from "typeorm";
import { IUserTokenRepository } from "@modules/users/domain/repositories/IUserTokenRepository";
import { IUserToken } from "@modules/users/domain/models/IUserToken";


class UserTokenRepository implements IUserTokenRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = dataSource.getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<IUserToken | null> {
    const userToken = await this.ormRepository.findOne({
      where: {
        token,
      },
    });
    return userToken;
  }


  public async generate(user_id: string): Promise<IUserToken> {
    const userToken = this.ormRepository.create({
      user_id
    });
    await this.ormRepository.save(userToken);
    return userToken;
  }
}

export default UserTokenRepository;
