import mongoose from 'mongoose'
import config from '../../config/index';
export { DatabaseListener } from './listener';

mongoose.connect(config.database.url, { useMongoClient: true });
mongoose.set('debug', true);

export default mongoose;