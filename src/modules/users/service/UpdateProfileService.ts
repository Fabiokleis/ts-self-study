import AppError from "@shared/errors/AppError";
import { compare, hash } from "bcryptjs";
import { IUpdateUser } from "../domain/models/IUpdateUser";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../domain/repositories/IUsersRepository";
import { IUser } from "../domain/models/IUser";


@injectable()
class UpdateProfileService {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ 
    user_id, 
    name,
    email,
    password,
    old_password
  }: IUpdateUser): Promise<IUser> {
    const user = await this.usersRepository.findOneById(user_id);

    if (!user) {
      throw new AppError('user not found.');
    }

    const userUpdateEmail = await this.usersRepository.findByEmail(email);

    if (userUpdateEmail && userUpdateEmail.id != user_id) {
      throw new AppError('This email already exists.');
    }

    if (password && !old_password) {
      throw new AppError('Old password is required.');
    }

    if (password && old_password) {
      const checkOldPwd = await compare(old_password, user.password);

      if (!checkOldPwd) {
        throw new AppError('Old password doesn\'t match.');
      }

      user.password = await hash(password, 8);
    }

    user.name = name;
    user.email = email;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateProfileService;
