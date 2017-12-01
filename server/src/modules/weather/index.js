import { WeatherController } from './weather.controller';

export const Routes = [
  {
    uri: 'weather/location',
    controller: WeatherController
  },

  {
    uri: 'weather/today',
    topic: 'hermes/hotword/weather/today',
    controller: WeatherController
  },

  {
    uri: 'weather/forecast',
    topic: 'hermes/hotword/weather/forecast',
    controller: WeatherController
  },
];