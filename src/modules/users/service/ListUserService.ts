import AppError from "@shared/errors/AppError";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";
import User from "../typeorm/entities/User";

class ListUserService {
  public async execute(): Promise<User[]> {
    return UsersRepository.find();
  }
}

export default ListUserService;
