import AppError from "@shared/errors/AppError";
import User from "../infra/typeorm/entities/User";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import authConfig from "@config/auth"
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../domain/repositories/IUsersRepository";

interface IRequest {
  email: string,
  password: string,
}

interface IResponse {
  user: User,
  token: string,
}

@injectable()
class CreateSessionService {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

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
    }, authConfig.jwt.secret as string);

    return { user, token };
  }
}

export default CreateSessionService;
