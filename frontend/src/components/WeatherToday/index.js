import React, { PureComponent } from "react";
import PropTypes from 'prop-types';

import { SunShower } from '../WeatherIcons'

export class WeatherToday extends PureComponent {
  static propTypes = {
    weather: PropTypes.shape({
      temperature: PropTypes.shape({
        temp: PropTypes.number.isRequired,
        temp_min: PropTypes.number.isRequired,
        temp_max: PropTypes.number.isRequired,
      }),
      humidity: PropTypes.number.isRequired,
      windSpeed: PropTypes.number.isRequired,
      main: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired, 
      icon: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired
    })
  }
  render() {
    const { 
      weather: {
        city,
        temperature: {
          temp,
          temp_min,
          temp_max
        },
        main
      },
    } = this.props
    return (
      <div className="flex-row" style={{
        position: 'absolute',
      }}>
        <div className="" style={{
          position: 'relative',
          top: 4,
          left: 15
        }}>
          <h1>{city || 'Utrecht'}</h1>
          <h2>{main || 'Rain'}</h2>
          <h2 className="d-inline">{temp.toFixed(1)}°</h2>
          <SunShower style={{
            position: 'absolute',
            left: 60,
            top: 50
          }} />
        </div>
        <div className="flex-column">
        </div>
      </div>
    )
  }
}
