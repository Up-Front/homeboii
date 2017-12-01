import { Logger } from '../helpers';
import modules from '../../modules';

/**
 * @name Router
 * @description
 * Class for registering routes for the given client
 * this way the client knows what it can and cant do.
 */
export class Router {

  /**
   * @constructor
   * @param uid
   * @description
   * Set a log namespace for the client its router.
   */
  constructor(client) {
    this.client = client;
    this.socket = client.socket;
    this.logger = new Logger(`client/${client.uid}/router/`);
    this.routes = {};

    modules.forEach(module => (
      module.Routes.forEach(route => this.register(route))
    ));
  }

  /**
   * @name register
   * @param {object} route - The route object
   * @description
   * Register the given route to the client
   */
  register(route){
    const Controller = route.controller;
    const socket = this.socket;

    this.routes[route.uri] = route;
    this.logger.log(`client registered route ${route.uri}`);

    socket.on(route.uri, (req) => {
      const requestObject = this.createRequestObject(route, req);
      if (Controller.constructor) return new Controller(requestObject);
      Controller(requestObject);
    });
  }

  /**
   * @name destroy
   * @param {String} uri - The uri to destroy
   * @description
   * Destroy a route of the client.
   */
  destroy(uri){
    if (!this.routes[uri]) return;

    socket.removeListener(uri, () => {
      this.logger.log(`${uri} is destroyed`);
    });

    delete this.routes[uri];
  }


  /**
   * @name createRequestObject
   * @param route
   * @param request
   * @returns {{req: *, client: *}}
   * @description
   * Request object for module listeners.
   */
  createRequestObject(route, request) {
    return {
      route: route,
      body: request,
      client: this.client
    };
  }
}