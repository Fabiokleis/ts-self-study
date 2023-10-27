import AppError from "@shared/errors/AppError";
import User from "../infra/typeorm/entities/User";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../domain/repositories/IUsersRepository";


interface IRequest {
  user_id: string;
}

@injectable()
class ShowUserService {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ user_id }: IRequest): Promise<User> {
    const user = await this.usersRepository.findOneById(user_id);

    if (!user) {
      throw new AppError('user not found.');
    }

    return user;
  }
}

export default ShowUserService;
