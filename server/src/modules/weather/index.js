import { WeatherController } from './weather.controller';

export const Routes = [
  {
    uri: 'weather/today',
    controller: WeatherController
  },


  {
    uri: 'weather/forecast',
    controller: WeatherController
  },
];