import bcrypt from 'bcrypt';
import { v4 as uuid } from "uuid";

import { ApiLog } from '@core/utils';

/**
 * Service class for encryption-related operations, such as generating UUIDs and handling password hashing.
 * @class EncryptationService
 */
export class EncryptationService {
  
  /**
   * Constructor for the EncryptationService class.
   * @constructor
   */
  constructor() {}

  /**
   * Generates a UUID (Universally Unique Identifier).
   * @returns {string} - The generated UUID.
   */
  genUUID(): string {
    const _uuid = uuid();
    return _uuid;
  }

  /**
   * Generates a hash for the provided text using bcrypt.
   * @param {string} text - The text to be hashed.
   * @returns {Promise<string>} - A promise resolving to the generated hash.
   */
  genHash(text: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        const hash = await bcrypt.hash(text, bcrypt.genSaltSync(10));
        resolve(hash);
      } catch (error) {
        ApiLog.error('Encryptation - GenHash', "There's an error hashing data", error);
        reject(error);
      }
    });
  }

  /**
   * Compares a text with a hashed value to check for a match.
   * @param {string} text - The text to be compared.
   * @param {string} hashed - The hashed value to compare against.
   * @returns {Promise<boolean>} - A promise resolving to a boolean indicating whether the text matches the hash.
   */
  compareHash(text: string, hashed: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const isHashed = await bcrypt.compare(text, hashed);
        resolve(isHashed);
      } catch (error) {
        ApiLog.error('Encryptation - CompareHash', "There's an error comparing hashes", error);
        reject(error);
      }
    });
  }
}
