import uid from 'uid';
import { Logger } from '../helpers';
import { Router } from './router';

/**
 * @name Client
 * @description
 * Class for wrapping client connections,
 * this should be the way to communicate with a client.
 */
export class Client {

  /**
   * @constructor
   * @param socket
   * @description
   * Construct the client, assign a uid to the client and store the socket object.
   */
  constructor(socket) {
    this.uid = uid(10);
    this.socket = socket;
    this.logger = new Logger(`client/${this.uid}`);
    this.router = new Router(this);

    this.clientIsReady();
  }

  /**
   * !TODO
   * @name send
   * @param event
   * @param payload
   * @description
   * Sent the given event to the client.
   */
  send(event, payload = {}) {
    this.socket.emit(event, payload);
  }

  /**
   * @name clientIsReady
   * @description
   * Notify the client its ready to be used.
   */
  clientIsReady() {
    this.send('client/register', { uid: this.uid });
  }
}