import React, { Component } from 'react';

import { WeatherToday} from '../WeatherToday';
import { WeatherForecast } from '../WeatherForecast';

export class App extends Component {
    constructor() {
        super();
        this.state = {
            weather: {},
        }
    }

    render() {
        const { weather } = this.state;

        return <div>
            <WeatherToday weather={weather} />
            <WeatherForecast weather={weather} />
        </div>;
    }
}
