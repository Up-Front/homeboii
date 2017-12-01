import { Route } from '../../lib';
import WeatherApi from 'openweather-node';

export class WeatherController extends Route {
  constructor(request) {
    super(request);

    const uri = this.route.uri;

    this.uri = this.route.uri;
    this.latitude = this.request.latitude;
    this.longitude = this.request.longitude;

    // Set defaults for weather api
    WeatherApi.setAPPID(this.config.weather.key);
    WeatherApi.setCulture(this.config.weather.country);
    WeatherApi.setForecastType(this.config.weather.type);

    if (!this.latitude && this.uri !== 'weather/location') return this.getLocation();
    if (uri === 'weather/today') return this.daily();
    if (uri === 'weather/forecast') return this.forecast();
  }

  getLocation() {
    this.client.send('weather/location', { uri: this.route.uri });
  }

  daily() {
    WeatherApi.now([[this.latitude, this.longitude]], (err, weather) => {
      if (err) return this.send(err);

      weather = weather[0];

      return this.send({
        temperature: weather.getDegreeTemp(),
        humidity: weather.values.main.humidity,
        windSpeed: weather.values.wind.speed,
        main: weather.values.weather[0].main,
        description: weather.values.weather[0].description,
        icon: weather.getIconUrl(),
        city:  weather.values.name.split(' ').pop()
      });
    });
  }

  forecast() {

  }
}