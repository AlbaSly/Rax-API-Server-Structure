import { ServerEnvironments } from "@environments/index";

/**
 * Nodemailer transport configuration
 */
export const TransporterConfig = {
  service: ServerEnvironments.emailConfig.service,
  auth: {
    user: ServerEnvironments.emailConfig.user,
    pass: ServerEnvironments.emailConfig.pass,
  }
};