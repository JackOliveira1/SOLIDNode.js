import { IMailProvider, IMessagem } from "../IMailProvides";
import nodemailer from 'nodemailer'
import Mail from "nodemailer/lib/mailer";

export class MailtrapMailProvider  implements IMailProvider {

    private transporter: Mail;

    constructor(){
        this.transporter = nodemailer.createTransport({
            host: 'sandbox.smtp.mailtrap.io',
            port: 2525,
            auth: {
                user: '7643f702ecf715',
                pass: '4b86de4a7dce36'
            }
        })
    }

    async sendMail(message: IMessagem): Promise<void> {
        await this.transporter.sendMail({
            to: {
                name: message.to.name,
                address: message.to.email
            }, 
            from: {
                name: message.from.name,
                address: message.from.email
            },
            subject: message.subject,
            html: message.body,
        })
    }
}