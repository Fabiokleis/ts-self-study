import AppError from "@shared/errors/AppError";
import { UserRepository } from "../typeorm/repositories/UsersRepository";
import { UserTokenRepository } from "../typeorm/repositories/UserTokenRepository";
import EtherealMail from "@config/mail/etherealMail";


interface IRequest {
  email: string,
}

class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const user = await UserRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User doesn\'t exists.');
    }

    const token = await UserTokenRepository.generate(user.id);
    
    await EtherealMail.sendMail({ 
      to: email, 
      body: `Solicitação de redefinição de senha recebida: ${token?.token}`
    });
  }
}

export default SendForgotPasswordEmailService;
