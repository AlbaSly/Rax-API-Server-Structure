import * as fns from "date-fns";

export namespace FormatUtils {

  export const FormatDateTime = (date: Date, formatStructure: string): string => fns.format(date, formatStructure);

  /**Ex: 7 -> 007, 49 -> 049 */
  export const FormatTextWithSpaces = (text: string, desirableSpaces: number = 0): string => {
    if (text.length >= desirableSpaces) return text;
    return text + (' ').repeat(desirableSpaces - text.length);
  }

  export const StringifyData = (data: any) => {
    return JSON.stringify(data, null, 2);
  }
}