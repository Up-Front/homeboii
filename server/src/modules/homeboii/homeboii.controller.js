import { Route } from '../../lib';

export class HomeboiiController extends Route {
  constructor(request) {
    super(request);
    this.listening();
  }

  listening() {
    this.send({ listening: true });
  }
}