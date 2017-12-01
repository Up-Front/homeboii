import React from "react";
import ReactDOM from 'react-dom';

import { App } from './components/App';
import './Styles/style.scss'
import './Styles/weather.scss'

const element = document.getElementById("app");
ReactDOM.render(
    <App />,
  element
);

