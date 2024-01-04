import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

import { WebServiceConfigurations } from "@configs/definitions";
import { EmailEnvs } from "@configs/interfaces";

import { ServerException } from "@core/classes";
import { IResolve, IReject } from "@core/interfaces";
import { ApiLog } from "@core/utils";

/**
 * Service class for sending emails using Nodemailer.
 */
export class EmailService {

  /** Configuration object for the email service. */
  private _config: EmailEnvs;

  /** Nodemailer transporter instance for sending emails. */
  private _transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;

  /**
   * Constructor for the EmailService class.
   * @param config Optional parameter for providing custom email configuration. Defaults to the configuration from WebServiceConfigurations.
   */
  constructor(config: EmailEnvs = WebServiceConfigurations.getInstance().emailConfig) {
    this._config = config;

    // Verify and set the configuration if valid.
    if (this.verifyConfiguration()) {
      this.setConfiguration();
    }
  }

  /**
   * Sends an email using the configured transporter.
   * @param data Email data to be sent.
   * @returns A Promise that resolves if the email is sent successfully and rejects with an error otherwise.
   */
  sendEmail(data: ISendEmail): Promise<IResolve<string>> {
    const { to, subject, text, html } = data;

    return new Promise(async (resolve: (data: IResolve<string>) => void, reject: (reason: IReject) => void) => {
      this._transporter.sendMail({
        from: this._config.provider,
        to,
        subject: subject.toUpperCase(),
        html: html ?? `<p>${text}</p>`,
      }, (error, info) => {
        if (error) {
          ApiLog.error('EmailService', 'Error in sendEmail method', error);
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
   * Verifies the completeness of the email service configuration.
   * @returns True if the configuration is complete; otherwise, throws a ServerException.
   */
  private verifyConfiguration(): boolean {
    const someEmptyValue = Object.values(this._config).some(value => !value);

    if (someEmptyValue) {
      throw new ServerException('EmailService', 'Verify email configuration variables in your WebServiceConfigurations class file first!');
    }

    return true;
  }

  /**
   * Sets up the Nodemailer transporter with the provided configuration.
   */
  private setConfiguration(): void {
    this._transporter = nodemailer.createTransport(this._config);
  }
}

/**
 * Interface for defining the structure of the data required to send an email.
 */
export interface ISendEmail {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}
