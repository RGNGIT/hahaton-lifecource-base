import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';
import { portalUrl, smtpConfig } from '../../config';

export class EmailWorker {

  private readonly transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport(
      // {
      // 	sendmail: true,
      // 	newline: 'unix',
      // 	path: '/usr/sbin/sendmail'
      // }
      smtpConfig
    );
  }

  async sendEmail(email, u, c) {
    const link = `http://${portalUrl}/api/users/confirmRegistration?u=${u}&c=${c}`;

    await this.transporter.sendMail({
      from: smtpConfig.auth.user,
      to: email,
      subject: 'Подтверждение регистрации на ПрофТестиум',
      html: `<h1>Приветствую! Ваша ссылка на подтверждение </h1><br><a href="${link}">${link}</a>`,
    });
  }
}