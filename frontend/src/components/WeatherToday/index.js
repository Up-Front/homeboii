import React, { PureComponent } from "react";
import PropTypes from 'prop-types';

import { SunShower } from '../WeatherIcons'

export class WeatherToday extends PureComponent {
  static propTypes = {
    weather: PropTypes.shape({
      temperature: PropTypes.number.isRequired,
      humidity: PropTypes.number.isRequired,
      windSpeed: PropTypes.number.isRequired,
      main: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired, 
      icon: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired
    })
  }
  render() {
    const { weather: {
      city
    }} = this.props
    return (
      <div>
        <h1>{city}</h1>
        <SunShower />
      </div>
    )
  }
}
