import joi from "joi";

import { FormatUtils } from "@core/utils";

/**
 * Custom error class representing exceptions thrown by the server.
 * @class ServerException
 * @extends {Error}
 */
export class ServerException extends Error {

  /**
   * Creates an instance of ServerException.
   * @param {string} source - The source or origin of the exception.
   * @param {string} msg - A descriptive message indicating the nature of the exception.
   * @param {unknown | null} details - Additional details or context related to the exception (optional).
   */
  constructor(
    private readonly source: string,
    private readonly msg: string,
    private readonly details: unknown | null = null,
  ) {
    super(FormatUtils.StringifyData({
      source,
      msg,
      details,
    }));
  }

  /**
   * Checks if the provided data has the main structure expected for ServerException.
   * @static
   * @param {unknown} data - The data to validate against the expected structure.
   * @returns {boolean} True if the data has the main structure, false otherwise.
   */
  static HasMainStructure(data: unknown): boolean {
    if (data === null || data === undefined) return false;
    
    try {
      let schema = joi.object({
        source: joi.string().required(),
        msg: joi.string().required(),
        details: joi.any().optional(),
      });
      return schema.validate(data).error ? false : true;
    } catch (error) {
      return false;
    }
  }
}
