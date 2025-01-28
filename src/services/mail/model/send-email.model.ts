export class BaseEmailModel {
  mailSubject: string;
  template: string;
  data: any;
}

export class SendSingleEmailModel extends BaseEmailModel {
  toMail: string;
}

export class SendMultipleEmailModel extends BaseEmailModel {
  toMails: string[];
}
