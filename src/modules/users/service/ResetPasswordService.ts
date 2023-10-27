import AppError from "@shared/errors/AppError";
import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { IUserTokenRepository } from "../domain/repositories/IUserTokenRepository";
import { IUsersRepository } from "../domain/repositories/IUsersRepository";

interface IRequest {
  token: string,
  password: string;
}

@injectable()
class ResetPasswordService {

  constructor(
    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ){}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User Token does\'nt exists.');
    }

    const user = await this.usersRepository.findOneById(userToken.user_id);

    if (!user) {
      throw new AppError('User does\'nt exists.');
    }

    const tokenCreatedAt = userToken.created_at;
    const comp = new Date(tokenCreatedAt.getTime() + 2 * 60 * 60 * 1000); // 2 hours

    if (comp.getTime() < Date.now()) {
      throw new AppError('Token expired.');
    }

    user.password = await hash(password, 8);

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
