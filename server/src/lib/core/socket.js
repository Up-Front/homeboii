import SocketIo from 'socket.io';
import { Manager } from './manager';
import { Logger } from '../helpers';

/**
 * @name SocketServer
 * @description
 * Socket server class. Create, handle and run a socket io server.
 */
export class SocketServer {

  /**
   * @constructor
   * @param http
   * @description
   * Create a logger instance, link the manager class and run the socket server.
   */
  constructor(http) {
    this.manager = Manager;
    this.http = http;
    this.logger = new Logger('socketServer');
    this.server = new SocketIo(this.http);
    this.listen();
  }

  /**
   * @name listen
   * @description
   * Register events and event handlers to listen to.
   */
  listen() {
    this.server.on('connection', (socket) => this.manager.register(socket));
  }
}