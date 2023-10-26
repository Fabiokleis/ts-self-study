import AppError from "@shared/errors/AppError";
import { UserRepository } from "../typeorm/repositories/UsersRepository";
import { UserTokenRepository } from "../typeorm/repositories/UserTokenRepository";
import { hash } from "bcryptjs";

interface IRequest {
  token: string,
  password: string;
}

class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await UserTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User Token does\'nt exists.');
    }

    const user = await UserRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does\'nt exists.');
    }

    const tokenCreatedAt = userToken.created_at;
    const comp = new Date(tokenCreatedAt.getTime() + 2 * 60 * 60 * 1000); // 2 hours

    if (comp.getTime() < Date.now()) {
      throw new AppError('Token expired.');
    }

    user.password = await hash(password, 8);

    await UserRepository.save(user);
  }
}

export default ResetPasswordService;
