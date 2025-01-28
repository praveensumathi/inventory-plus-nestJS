import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SendEmailDto {
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    name: string;
    toMail?: string;
    mailSubject?: string;
    template?: string;
    context?: string;
}