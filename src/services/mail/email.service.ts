import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SendEmailDto } from './dto/send-email.dto';


@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) { }

  async sendEmail(createEmailDto: SendEmailDto): Promise<string> {
    const { email, name, toMail: to_mail, mailSubject: mail_subject, template, context } = createEmailDto;

    const emailSent = await this.mailerService.sendMail({
      to: to_mail,
      from: `"Support Team" <${email}>`, // override default from
      subject: mail_subject,
      template: 'welcome', // `.hbs` extension is appended automatically
      context: {
        name,
      },
    });

    return 'email sent';
  }
}