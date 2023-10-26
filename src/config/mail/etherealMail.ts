import nodemailer from 'nodemailer';
import HandlebarsMailTemplate from './HandlebarsMailTemplate';

interface ITemplateVariable {
  [key: string]: string | number
}

interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariable;
}

interface IMailContact {
  name: string;
  email: string;
}

interface ISendMail {
  to: IMailContact;
  from?: IMailContact;
  subject: string; 
  templateData: IParseMailTemplate
}

export default class EtherealMail {
  static async sendMail({ to, from, subject, templateData }: ISendMail): Promise<void> {
    const account = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });

    const mailTemplate = new HandlebarsMailTemplate();

    const message = await transporter.sendMail({
      from: {
        name: from?.name || 'equipe apivendas',
        address: from?.email || 'equipe@email.com'
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await mailTemplate.parse(templateData) || 'ola',
    });

    console.log('Message sent: %s ', message.messageId);
    console.log('Previre URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
