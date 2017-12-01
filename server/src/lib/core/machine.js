import mqtt from 'mqtt';
import config from '../../config/index';
import { Logger } from '../helpers';

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
    this.logger = new Logger(`machine/listener/`);
    this.config = config.machine;
    this.events = {};
    this.machine = mqtt.connect(this.config.url);

    this.machine.on('connect', () => {
      this.machine.subscribe('hermes/hotword/#');
    });

    this.machine.on('message', (topic, message) => {
      const event = this.events[topic];
      if (!event) return this.logger.log(`event handling failed for ${topic}`);

      this.logger.log(`event received for ${topic} with ${message}`);

      event(message.toString());
    });
  }

  subscribe(event, handler) {
    if (!event || !handler) return false;

    this.events[event] = handler;
  }

  publish(event, payload) {
    this.machine.publish(event, payload);
  }
}