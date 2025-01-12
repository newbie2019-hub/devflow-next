import mongoose, { Mongoose } from 'mongoose';

import logger from './logger';
import '../database'; // Pre-loads all the model to prevent any error

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

// Cache the connection
interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  //eslint-disable-next-line
  var mongoose: MongooseCache;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const dbConnect = async (): Promise<Mongoose> => {
  if (cached.conn) {
    logger.info('Using existing MongoDB connection');
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: 'devflow',
      })
      .then((mongoose) => {
        logger.info('Connected to MongoDB');
        return mongoose;
      })
      .catch((err) => {
        logger.error('Error connecting to MongoDB:', err);
        throw err;
      });
  }

  cached.conn = await cached.promise;

  return cached.conn;
};

export default dbConnect;
