import AppError from "@shared/errors/AppError";
import path from "path";
import fs from 'fs';
import uploadConfig from '@config/upload'
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../domain/repositories/IUsersRepository";
import { IUser } from "../domain/models/IUser";

interface IRequest {
  user_id: string,
  avatarFilename: string,
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ){}
  public async execute({ user_id, avatarFilename }: IRequest): Promise<IUser> {
    const user = await this.usersRepository.findOneById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    if (user.avatar) {
      const userAvatarFilepath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilepath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilepath);
      }
    }

    user.avatar = avatarFilename;

    await this.usersRepository.save(user);

    return user
  }
}

export default UpdateUserAvatarService;
