import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  throw new Error("MONGODB_URL is not defined in environment variables");
}

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// Prevent multiple connections in Next.js dev/build
declare global {
  var mongoose: MongooseCache | undefined;
}

const cached = globalThis.mongoose ?? (globalThis.mongoose = {
  conn: null,
  promise: null,
});

export const connectDb = async (): Promise<typeof mongoose> => {
  // If already connected, reuse it
  if (cached.conn) {
    return cached.conn;
  }

  // If no connection promise exists, create one
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URL).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};