import AppError from "@shared/errors/AppError";
import EtherealMail from "@config/mail/etherealMail";
import path from 'path';
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../domain/repositories/IUsersRepository";
import { IUserTokenRepository } from "../domain/repositories/IUserTokenRepository";


interface IRequest {
  email: string,
}

@injectable()
class SendForgotPasswordEmailService {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository
  ){}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User doesn\'t exists.');
    }

    const { token } = await this.userTokenRepository.generate(user.id);
  
    const forgotPasswordTemplate = path.resolve(
      __dirname, '..', 'views', 'forgot_password.hbs'
    );

    await EtherealMail.sendMail({ 
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[Api vendas] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,
        }
      } 
    });
  }
}

export default SendForgotPasswordEmailService;
