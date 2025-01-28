import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import {
  SendMultipleEmailModel,
  SendSingleEmailModel,
} from "./model/send-email.model";
import { SentMessageInfo } from "nodemailer";

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(emailModel: SendSingleEmailModel): Promise<SentMessageInfo> {
    const { data, toMail, mailSubject, template } = emailModel;

    const emailSent = await this.mailerService.sendMail({
      to: toMail,
      subject: mailSubject,
      template: template,
      context: data,
    });

    return emailSent;
  }

  async sendEmails(
    emailModel: SendMultipleEmailModel,
  ): Promise<SentMessageInfo> {
    const { toMails, data, mailSubject, template } = emailModel;

    const emailSent = await this.mailerService.sendMail({
      to: toMails,
      subject: mailSubject,
      template: template,
      context: data,
    });

    return emailSent;
  }
}
