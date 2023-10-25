import AppError from "@shared/errors/AppError";
import { UserRepository } from "../typeorm/repositories/UsersRepository";
import User from "../typeorm/entities/User";

class ListUserService {
  public async execute(): Promise<User[]> {
    return UserRepository.find();
  }
}

export default ListUserService;
