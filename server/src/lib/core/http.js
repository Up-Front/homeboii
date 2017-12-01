import Express from 'express';
import Http from 'http';
import path from 'path';
import config from '../../config/index';

/**
 * @name HttpServer
 * @description
 * The HttpServer which is running on the given port.
 */
export class HttpServer {

  /**
   * @constructor
   * @description
   * Create a new http server with only one endpoint which returns a html file.
   */
  constructor() {
    this.config = config.server;
    this.app = Express();
    this.client = Http.Server(this.app);

    this.app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, '../../../index.html')));
    this.listen(this.config.port);
  }

  /**
   * @name listen
   * @param port
   * @description
   * Run the http server.
   */
  listen(port) {
    this.client.listen(port, () => console.log(`Server is listening on port: ${port}`));
  }
}