import crypto from 'crypto';

import { ApiLog } from '@core/utils';

/**
 * Service class for generating various types of keys and tokens, such as random tokens, passwords, and 6-digit key codes.
 * @class KeysGeneratorService
 */
export class KeysGeneratorService {

  /** Minimum length for generated passwords. */
  private readonly MIN_PASSWORD_LENGTH: number = 8;

  /**
   * Constructor for the KeysGeneratorService class.
   * @constructor
   */
  constructor() {}

  /**
   * Generates a random token using crypto.randomBytes.
   * @returns {Promise<string>} - A promise resolving to the generated random token.
   */
  genRandomToken(): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        const token: string = crypto.randomBytes(20).toString('hex');
        resolve(token);
      } catch (error) {
        ApiLog.error('AuthGeneration - Token', "There's an error generating token", error);
        reject(error);
      }
    });
  }

  /**
   * Generates a random password with the specified length.
   * If the provided length is less than 6, the minimum password length is used.
   * @param {number} length - The length of the generated password.
   * @returns {Promise<string>} - A promise resolving to the generated random password.
   */
  genRandomPassword(length: number = this.MIN_PASSWORD_LENGTH): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        if (length < 6) {
          length = this.MIN_PASSWORD_LENGTH;
          ApiLog.warning('AuthGeneration - Random Password', "The password length has been increased to " + this.MIN_PASSWORD_LENGTH);
        }

        const characters: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        let password: string = "";

        for (let i = 0; i < length; i++) {
          const index = Math.floor(Math.random() * characters.length);
          password += characters.charAt(index);
        }

        resolve(password);
      } catch (error) {
        ApiLog.error('AuthGeneration - Random Password', "There's an error generating random password", error);
        reject(error);
      }
    });
  }

  /**
   * Generates a random 6-digit key code.
   * @returns {string} - The generated random 6-digit key code.
   */
  genRandom6DigitsKeyCode(): string { 
    return (Math.floor(100000 + Math.random() * 900000).toString());
  }
}
