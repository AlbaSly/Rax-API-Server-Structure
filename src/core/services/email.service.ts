import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

import { EmailEnvs, ServerEnvironments } from "@environments/index";

import { IReject, IResolve } from "@core/interfaces";
import { ApiLog } from "@core/utils";
import { ServerException } from "@core/classes";
import { TransporterConfig } from "@core/config";

/**
 * Service Class to Send Emails
 */
export class EmailService {

  private _config: EmailEnvs;
  private _transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;

  constructor() {
    this._config = ServerEnvironments.emailConfig;

    if (this.verifyConfiguration()) {
      this.setConfiguration();
    }
  }

  /**
   * Send E-mail
   * @param data email data to sent
   */
  sendEmail(data: ISendEmail) {
      const {to, subject, text, html} = data;

      return new Promise(async (resolve: (data: IResolve<string>) => void, reject: (reason: IReject) => void) => {
          this._transporter.sendMail({
              from: this._config.provider,
              to,
              subject: subject.toUpperCase(),
              html: html ?? `<p>${text}</p>`,
          }, (e, info) => {
              if (e) {
                ApiLog.error('EmailService', 'Error in SendEmail method', e);
                return reject({
                  status: 500,
                  msg: "There's an error sending the email",
                  error: null,
                });
              }

              ApiLog.info('EmailService', info.response);
              return resolve({
                status: 201,
                msg: "Email sent successfully",
                data: 'ok',
              });
          });
      });
  }

  /**
   * 
   */
  private verifyConfiguration(): boolean {
    const someEmptyValue = Object.values(ServerEnvironments.emailConfig).some(value => !value);

    if (someEmptyValue) throw new ServerException('EmailService', 'Verify Email configuration vars in your ServerEnvironments class file first!');

    return true;
  }

  private setConfiguration(): void {
    this._transporter = nodemailer.createTransport(TransporterConfig);

    ApiLog.info('EmailService', 'Configuration established. Ready to send emails.');
  }

}

export interface ISendEmail {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}