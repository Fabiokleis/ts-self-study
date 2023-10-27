import AppError from "@shared/errors/AppError";
import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { IUser } from "../domain/models/IUser";
import { ICreateUser } from "../domain/models/ICreateUser";
import { IUsersRepository } from "../domain/repositories/IUsersRepository";

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository
  ) {}

  public async execute({ name, email, password }: ICreateUser): Promise<IUser> {
    const emailExists = await this.userRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPass = await hash(password, 8);

    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPass
    });

    return user;
  }
}

export default CreateUserService;
