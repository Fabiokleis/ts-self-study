import { Request, Response } from "express";
import ListUserService from "../../../service/ListUserService";
import CreateUserService from "../../../service/CreateUserService";
import { instanceToInstance } from "class-transformer";
import { container } from "tsyringe";

export default class UserController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUser = container.resolve(ListUserService);
    const users = await listUser.execute();

    console.log(request.user.id);
    return response.json(instanceToInstance(users));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({
      name, email, password
    });

    return response.json(instanceToInstance(user));
  }
}
