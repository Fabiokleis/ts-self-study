import { Request, Response } from "express";
import CreateSessionService from "../../../service/CreateSessionService";
import { instanceToInstance } from "class-transformer";
import { container } from "tsyringe";

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const  { email, password } = request.body;

    const createSession = container.resolve(CreateSessionService);

    const user = await createSession.execute({
      email, password
    });

    return response.json(instanceToInstance(user));
  }
}