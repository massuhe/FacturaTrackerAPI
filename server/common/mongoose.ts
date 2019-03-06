import mongoose from 'mongoose';

class Mongoose {

  public init(): void {
    // Tell mongoose to use new methods instead of those which will be deprecated
    mongoose.set('useCreateIndex', true);
    mongoose.set('useFindAndModify', false);
    // Set up default mongoose connection
    mongoose.connect(process.env.DATABASE, { useNewUrlParser: true });
    // Get Mongoose to use the global promise library
    mongoose.Promise = global.Promise;
    // Get the default connection
    const db = mongoose.connection;
    // Bind connection to error event (to get notification of connection errors)
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  }
}

export default new Mongoose();