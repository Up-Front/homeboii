/**
 * @name Logger
 * @description
 * Logger class for better logs.
 */
export class Logger {

  /**
   * @constructor
   * @param namespace
   * @description
   * Create a new instance for the given namespace.
   */
  constructor(namespace) {
    this.namespace = namespace;
  }

  /**
   * @name log
   * @param message
   * @description
   * Log the given message with the default template.
   */
  log(message) {
    console.log('@homeboii | %s | - %s', this.namespace, message);
  }
}