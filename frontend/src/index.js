import io from "socket.io-client";
import React from "react";
import ReactDOM from 'react-dom';

const element = document.getElementById("app");
ReactDOM.render(
    <div>Hoi</div>,
  element
);

const conn = io("http://192.168.1.46:3000");

conn.on("weather/today", res => {
  console.log(res);
});

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
