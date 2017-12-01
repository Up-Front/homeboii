import { Logger } from '../helpers/index';

/**
 * @name Route
 * @description
 * The route class is a wrapper for each Route.
 */
export class Route {

  /**
   * @constructor
   * @param request
   * @description
   * Create a new logger instance and set the request.
   */
  constructor(request) {
    this.route = request.route;
    this.request = request.body || {};
    this.client = request.client;
    this.logger = new Logger(`route/${this.route.uri}/`);
  }

  /**
   * @name send
   * @description
   * Send a response back to the client.
   * @param response
   */
  send(response) {
    let responseObject = (
      response instanceof Error ? this.onError(response) : this.onSuccess(response)
    );

    this.client.send(this.route.uri, responseObject);
  }

  /**
   * @name onError
   * @param response
   * @description
   * Return an response error object.
   * @returns {{error: boolean, message: string, stack: *}}
   */
  onError(response) {
    return {
      error: true,
      message: response.toString(),
      stack: response
    };
  }

  /**
   * @name onSuccess
   * @param response
   * @description
   * Return an response success object.
   * @returns {*}
   */
  onSuccess(response) {
    return Object.assign(response, { status: 200 });
  }
}