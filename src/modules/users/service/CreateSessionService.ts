import AppError from "@shared/errors/AppError";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";
import User from "../typeorm/entities/User";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import authConfig from "@config/auth"

interface IRequest {
  email: string,
  password: string,
}

interface IResponse {
  user: User,
  token: string,
}

class CreateSessionService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await UsersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email or password.', 401);
    }

    const passConfirmed = await compare(password, user.password);

    if (!passConfirmed) {
      throw new AppError('Incorrect email or password.', 401);
    }

    const token = sign({
      sub: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    }, authConfig.jwt.secret);

    return { user, token };
  }
}

export default CreateSessionService;