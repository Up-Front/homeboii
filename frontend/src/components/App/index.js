import React, { Component } from 'react';

import { WeatherToday} from '../WeatherToday';
import { WeatherForecast } from '../WeatherForecast';

import io from 'socket.io-client';

import './style.scss'

export class App extends Component {
    constructor() {
        super();
        this.state = {
            weather: {
              temperature: 0,
              humidity: 0,
              windSpeed: 0,
              main: 'main',
              description: 'description',
              icon: '',
              city: 'Utrecht',
            },
            screen: 'main'
        }
    }

    componentDidMount() {
      const conn = io('http://192.168.1.46:3000');
      conn.on('homeboii/listening', data => {
        console.log('listening', data)
      })
      conn.on('weather/location', data => {
        console.log('weather/location', data)
        window.navigator.geolocation.getCurrentPosition(res => {
          const { latitude, longitude } = res.coords
          const coords = { latitude, longitude }
          console.log('sending', coords)
          conn.emit('weather/today', coords, ack => console.log(ack))
        })
      })
      conn.on('weather/today', (weather) => {
        console.log('weather/today', weather)
        this.setState({ weather })
      })
      conn.on("connect", () => {
        console.log("[EVENT][CONNECTION] Connected to server");
      });
      
      conn.on("connect_error", err => {
        console.log("[ERROR][CONNECTION]", err);
      });
      
      conn.on("connect_timeout", err => {
        console.log("[ERROR][CONNECTION] Timeout", err);
      });
      
      conn.on("disconnect", reason => {
        console.log("[EVENT][CONNECTION] Disconnecting");
      });
      
      conn.on("error", err => {
        console.log(`[ERROR]`, err);
      });
      
      conn.on("reconnect_attempt", () => {
        console.log("[EVENT][RECONNECT] Reconnecting");
      });
      
      conn.on("reconnect_error", err => {
        console.log("[ERROR][RECONNECT]", err);
      });
      
      conn.on("reconnect_failed", err => {
        console.log("[ERROR][RECONNECT][FAILED]", err);
      });
      
      conn.on("reconnect", attempts => {
        console.log(`[EVENT][RECONNECT] Reconnected after ${attempts} attempts`);
      });
    }

    render() {
        const { weather } = this.state;

        if (this.state.screen === 'main') {
          return (
            <div className="main">
              <div className="main-row">
                <div className="main-top-left">
                  <WeatherToday weather={weather} />
                </div>
                <div className="main-top-right">
                  TR
                </div>
              </div>
              <div className="main-row">
                <div className="main-bottom-left">
                  BL
                </div>
                <div className="main-bottom-right">
                  BR
                </div>
              </div>
            </div>
          )
        }

        if (screen === 'forecast') {
          return (
            <div className="padded">
              <WeatherForecast weather={weather} />
            </div>
          )
        }

        return (
          <div>
              <WeatherToday weather={weather} />
              <WeatherForecast weather={weather} />
          </div>
        );
    }
}
