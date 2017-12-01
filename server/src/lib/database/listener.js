import { Logger } from '../helpers/index';
import { MongoClient, Timestamp } from 'mongodb';

export class DatabaseListener {
  constructor(url, name, observers = {}) {
    this.name = name;
    this.observers = observers;
    this.client = MongoClient;
    this.databaseUrl = url;
    this.logger = new Logger(`database/${name}`);

    this.connect()
      .catch(err => this.logger.log('trigger connection error:', err));
  }

  connect() {
    return MongoClient
      .connect(this.databaseUrl)
      .then((db) => {
        this.database = db;
        this.collection = db.collection(this.name);
        this.logger.log('trigger is creating');
        this.getTimestamp().then(timestamp => this.subscribe(timestamp));
      })
  }

  subscribe(timestamp) {
    this.stream = this
      .collection
      .find(
        { ts: { $gt: timestamp } },
        {
          tailable: true,
          awaitdata: true,
          oplogReplay: true,
          numberOfRetries: -1
        }
      )
      .stream();

    this.logger.log('trigger is listening');

    this.stream.on('data', (doc) => this.onData(doc));
    this.stream.on('error',(error) => this.onError(error));
    this.stream.on('end', (message) => this.onDone(message));
  }

  onData(...params) {
    this.logger.log('data received for trigger');
    if(this.observers.next) return this.observers.next(params);
  }

  onError(...params) {
    this.logger.log('error received for trigger');
    if(this.observers.catch) return this.observers.catch(params);
  }

  onDone(...params) {
    this.logger.log('trigger is closing');
    if(this.observers.done) return this.observers.done(params);
  }

  getTimestamp() {
    const timestamp = new Timestamp(0, Math.floor(new Date().getTime() / 1000));

    return this.collection
      .find({}, { ts: 1 })
      .sort({ $natural: -1 })
      .limit(1)
      .toArray()
      .then((data) => (data[0] && data[0].ts ? data[0].ts : timestamp))
      .catch(err => this.logger.log('trigger timestamp error', err));
  }
}