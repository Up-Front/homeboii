import mqtt from 'mqtt';
import config from '../../config/index';

/**
 * @name MachineListener
 * @description
 * The MachineListener listens to the MQTT protocol for communicating between machines.
 */
export class MachineListener {

  /**
   * @constructor
   * @description
   * Connect to the MQTT server given by the config settings.
   */
  constructor() {
    this.config = config.machine;
    this.machine = mqtt.connect(this.config.url);
  }

  subscribe(event, handler) {
    this.machine.subscribe(event, handler);

    //test
    if (event === 'weather/today') return handler({ test: true });
  }

  publish(event, payload) {
    this.machine.publish(event, payload);
  }
}