import React, { Component } from 'react';

import { WeatherToday} from '../WeatherToday';
import { WeatherForecast } from '../WeatherForecast';
import { Lights } from '../Lights'

import io from 'socket.io-client';

import './style.scss'

export class App extends Component {
    constructor() {
        super();
        this.state = {
            weather: null,
            screen: 'main',
            listening: true
        }
    }

    componentDidMount() {
      const conn = io('http://192.168.1.46:3000');
      window.navigator.geolocation.getCurrentPosition(res => {
        const { latitude, longitude } = res.coords
        const coords = { latitude, longitude }
        console.log('sending', coords)
        conn.emit('weather/today', coords, ack => console.log(ack))
      })
      conn.on('homeboii/listening', data => {
        console.log('listening', data)
        this.setState({ listening: true })
      })
      conn.on('weather/location', data => {
        console.log('weather/location', data)
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
        const { weather, listening } = this.state;
        console.log('listening', listening)

        if (this.state.screen === 'main') {
          return (
            <div className="main">
              <div className="main-row">
                <div className="main-top-left">
                 { weather && <WeatherToday weather={weather} /> }
                </div>
                <div className="main-top-right">
                  TR
                </div>
              </div>
              <div className="main-row">
                <div className="main-bottom-left">
                  BL
                </div>
                <div className="main-bottom-center">
                  { listening && <Lights /> }
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
