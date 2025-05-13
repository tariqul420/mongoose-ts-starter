import mongoose from 'mongoose';
import config from '../config/config';

// Define type for mongoose cache
type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// Using a simpler approach with a type declaration for global
const mongooseGlobal = global as unknown as {
  mongoose?: MongooseCache;
};

const cached: MongooseCache = mongooseGlobal.mongoose || {
  conn: null,
  promise: null,
};

if (!mongooseGlobal.mongoose) {
  mongooseGlobal.mongoose = cached;
}

async function dbConnect() {
  const MONGODB_URI = config.mongodb.uri.replace(
    '<db_password>',
    config.mongodb.password,
  );

  if (!MONGODB_URI) {
    throw new Error(
      'Please define the MONGODB_URI environment variable inside .env.local',
    );
  }

  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mong) => {
      return mong;
    });
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
