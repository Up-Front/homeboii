import { Route } from '../../lib';
import WeatherApi from 'openweather-node';

export class WeatherController extends Route {
  constructor(request) {
    super(request);

    // Set defaults for weather api
    WeatherApi.setAPPID(this.config.weather.key);
    WeatherApi.setCulture(this.config.weather.country);
    WeatherApi.setForecastType(this.config.weather.type);

    if(this.route.uri === 'weather/today') return this.daily();
  }

  daily() {
    WeatherApi.now('Utrecht', (err, json) => {
      if (err) return this.send(err);

      return this.send({
        degree: json.getDegreeTemp(),
        pressure: json.values.main.pressure,
        humidity: json.values.main.humidity,
        wind: json.values.wind,
        clouds: json.values.clouds,
        visibility: json.values.visibility,
      });
    });
  }
}