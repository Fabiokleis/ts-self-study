import { IUser } from "../models/IUser";
import { ICreateUser } from "../models/ICreateUser";

export interface IUsersRepository {
  find(): Promise<IUser[]>;
  findByName(name: string): Promise<IUser | null>;
  findOneById(id: string): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>
  create(user: ICreateUser): Promise<IUser>;
  save(user: IUser): Promise<void>;
}
