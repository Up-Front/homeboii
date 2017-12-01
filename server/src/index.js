import { HttpServer } from './lib';
import { SocketServer } from './lib';
import { MachineListener } from './lib';

// Create a http server.
const http = new HttpServer();

// Create a websocket server.
const webSocket = new SocketServer(http.client);
