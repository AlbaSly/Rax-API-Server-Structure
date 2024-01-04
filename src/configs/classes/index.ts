/**
 * Abstract class for loading configurations.
 * Child classes must implement the 'loadEnvironmentVars' method to load environment variables.
 */
export abstract class ConfigurationsLoader {
  /** Flag indicating whether environment variables are loaded. */
  private _environmentVarsLoaded: boolean;

  /**
   * Abstract method to be implemented by child classes.
   * Loads environment variables required for the application.
   */
  abstract loadEnvironmentVars(): void;

  /**
   * Getter for the 'areEnvironmentVarsLoaded' property.
   * Indicates whether environment variables are loaded.
   * @returns A boolean value indicating whether environment variables are loaded.
   */
  get areEnvironmentVarsLoaded(): boolean {
    return this._environmentVarsLoaded;
  }

  /**
   * Setter for the 'setEnvironmentsVarLoaded' property.
   * Sets the 'areEnvironmentVarsLoaded' flag to true when environment variables are successfully loaded.
   * @param value A boolean value indicating whether environment variables are loaded.
   */
  set setEnvironmentsVarsLoaded(value: boolean) {
    this._environmentVarsLoaded = value;
  }
}