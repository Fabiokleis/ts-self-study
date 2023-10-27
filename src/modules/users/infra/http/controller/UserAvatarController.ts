import { Request, Response } from "express";
import UpdateUserAvatarService from "../../../service/UpdateUserAvatarService";
import { instanceToInstance } from "class-transformer";
import { container } from "tsyringe";

export default class UserAvatarController {

  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatarService = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatarService.execute({
      user_id: request.user.id,
      avatarFilename: request.file?.filename as string
    });

    return response.json(instanceToInstance(user));
  }
}
