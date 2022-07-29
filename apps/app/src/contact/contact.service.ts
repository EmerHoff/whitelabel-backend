import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as ejs from 'ejs';
import * as path from 'path';
import * as nodemailer from 'nodemailer';
import { User } from 'libs/database/models/user.model';
import { EMAIL_CREDENTIALS } from 'libs/configs/config';

@Injectable()
export class ContactService {
  async sendEmail(
    user: User,
    template: string,
    subject: string,
    token: string,
  ) {
    const view = fs.readFileSync(
      path.join(
        __dirname,
        '../../../../configs/templates',
        `/${template}.html`,
      ),
      'utf8',
    );

    const html = await ejs.render(
      view,
      { name: user.name, token: token },
      { async: true },
    );

    const transporter = nodemailer.createTransport({
      host: EMAIL_CREDENTIALS.host,
      port: EMAIL_CREDENTIALS.port,
      secure: false,
      auth: {
        user: EMAIL_CREDENTIALS.user,
        pass: EMAIL_CREDENTIALS.password,
      },
      ignoreTLS: false,
    });

    return await transporter.sendMail({
      from: EMAIL_CREDENTIALS.user,
      to: user.email,
      subject,
      html,
    });
  }
}
