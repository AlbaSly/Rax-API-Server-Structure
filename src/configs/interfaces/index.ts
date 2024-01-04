/**
 * Nodemailer envionment variables
 */
export interface EmailEnvs {
  provider: string | undefined;
  service: string | undefined;
  user: string | undefined;
  pass: string | undefined;
}

/**
 * JWT environment variables
 */
export interface JWTEnvs {
  secret: string | undefined;
  expiration: string | undefined;
}
