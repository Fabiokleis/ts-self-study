import AppError from "@shared/errors/AppError";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";
import User from "../typeorm/entities/User";
import { compare, hash } from "bcryptjs";


interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password: string;
  old_password: string;
}

class UpdateProfileService {
  public async execute({ 
    user_id, 
    name,
    email,
    password,
    old_password
  }: IRequest): Promise<User> {
    const user = await UsersRepository.findById(user_id);

    if (!user) {
      throw new AppError('user not found.');
    }

    const userUpdateEmail = await UsersRepository.findByEmail(email);

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

    await UsersRepository.save(user);

    return user;
  }
}

export default UpdateProfileService;
