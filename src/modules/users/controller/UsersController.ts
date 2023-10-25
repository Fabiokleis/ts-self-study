import { Request, Response } from "express";
import ListUserService from "../service/ListUserService";
import CreateUserService from "../service/CreateUserService";

export default class UserController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUser = new ListUserService();
    const users = await listUser.execute();

    return response.json(users);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      name, email, password
    });

    return response.json(user);
  }
}
