import ShowProfileService from "@modules/users/service/ShowProfileService";
import UpdateProfileService from "@modules/users/service/UpdateProfileService";
import { Request, Response } from "express";


export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const showProfile = new ShowProfileService();
    const user_id = request.user.id;
    const user = await showProfile.execute({ user_id });

    console.log(request.user.id);
    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email, password, old_password } = request.body;
    const updateProfile = new UpdateProfileService();
    const user_id = request.user.id;

    const user = await updateProfile.execute({
      user_id, name, email, password, old_password
    });

    return response.json(user);
  }
}
