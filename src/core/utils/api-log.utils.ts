import colors from "colors";

import { API_DATETIME_FORMAT } from "@core/constants";
import { FormatUtils } from ".";
import { ServerException } from "@core/classes";

/**
 * Namespace containing utility functions for logging API-related information.
 * @namespace ApiLog
 */
export namespace ApiLog {

  /**
   * Log informational messages.
   * @param {string} sourceName - The name or identifier of the log source.
   * @param {string} description - The description or content of the log message.
   * @returns {void}
   */
  export const info = (sourceName: string, description: string): void => {
    const datetime = FormatUtils.FormatDateTime(new Date(), API_DATETIME_FORMAT);
    console.log(`${datetime} - ${colors.cyan(ELogTypes.INFO)} - ${colors.yellow(sourceName)} - ${description}`);
  }

  /**
   * Log verbose messages.
   * @param {string} sourceName - The name or identifier of the log source.
   * @param {string} description - The description or content of the log message.
   * @returns {void}
   */
  export const verbose = (sourceName: string, description: string): void => {
    const datetime = FormatUtils.FormatDateTime(new Date(), API_DATETIME_FORMAT);
    console.log(`${datetime} - ${colors.blue(ELogTypes.VERBOSE)} - [${colors.yellow(sourceName)}] - ${description}`);
  }

  /**
   * Log warning messages.
   * @param {string} sourceName - The name or identifier of the log source.
   * @param {string} description - The description or content of the log message.
   * @returns {void}
   */
  export const warning = (sourceName: string, description: string): void => {
    const datetime = FormatUtils.FormatDateTime(new Date(), API_DATETIME_FORMAT);
    console.log(`${datetime} - ${colors.yellow(ELogTypes.WARNING)} - ${colors.yellow(sourceName)} - ${description}`);
  }

  /**
   * Log error messages.
   * @param {string} sourceName - The name or identifier of the log source.
   * @param {string} description - The description or content of the log message.
   * @param {any} e - The error object, if available.
   * @returns {void}
   */
  export const error = (sourceName: string, description: string, e: any = null): void => {
    const datetime = FormatUtils.FormatDateTime(new Date(), API_DATETIME_FORMAT);
    let error = e;
    let showDetails = false;

    if (e === null) error = '';

    if (typeof e === 'object') {
      if (ServerException.HasMainStructure(e)) {
        error = `${datetime} - ${colors.red(ELogTypes.ERROR)} - [${colors.yellow(e.source)}] - ${e.msg}\nDetails:`;
        showDetails = true;
      }
    }

    console.log(`\n${datetime} - ${colors.red(ELogTypes.ERROR)} - [${colors.yellow(sourceName)}] - ${description}`);
    if (error) console.log(error);
    if (showDetails) console.log(e.details);
  }

  /**
   * Enum representing different types of log messages.
   * @enum {string}
   */
  enum ELogTypes {
    INFO    = "[INFO]",
    VERBOSE = "[VERBOSE]",
    WARNING = "[WARNING]",
    ERROR   = "[ERROR]"
  }
}
