import { Client } from './client';
import { Logger } from '../helpers/logger';

/**
 * @name Manager
 * @description
 * Manager class for managing clients registering and destroying clients.
 */
class SocketManager {

  /**
   * @constructor
   * @description
   * Create a new logger instance with the right namespace
   * Create a storage for clients.
   */
  constructor() {
    this.logger = new Logger('manager');
    this.clients = {};
  }

  /**
   * @name getAmountOfClients
   * @description
   * Get the amount of clients which are registered.
   * @returns {Number}
   */
  getAmountOfClients() {
    return Object.keys(this.clients).length;
  }

  /**
   * @name register
   * @param socket
   * @description
   * Register the new connection as a Client.
   * @returns {Client}
   */
  register(socket) {
    this.logger.log('new connection received.');

    const client = new Client(socket);
    this.clients[client.uid] = client;

    client.socket.on('disconnect', () => this.destroy(client.uid));

    this.logger.log(`connection converted to client with uid ${client.uid}`);
    this.logger.log(`${this.getAmountOfClients()} clients are connected to the server`);

    return client;
  }

  /**
   * @name destroy
   * @param uid
   * @description
   * Destroy the given client.
   */
  destroy(uid) {
    this.logger.log(`client ${uid} disconnected, destroying the client`);
    delete this.clients[uid];
    this.logger.log(`still ${this.getAmountOfClients()} clients are connected to the server`);
  }
}

export const Manager = new SocketManager();