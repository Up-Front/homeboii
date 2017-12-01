import { HomeboiiController } from './homeboii.controller';

export const Routes = [
  {
    uri: 'homeboii/listening',
    topic: 'hermes/hotword/homeboii/detected',
    controller: HomeboiiController,
  },
];