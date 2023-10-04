const mongoose = require('mongoose');
require('./models/city.model');

mongoose.connect(process.env.MONGODB_CONNECTION_STRING + process.env.MONGODB_DATABASE_NAME);

mongoose.connection.on('connected', () => {
  console.log(process.env.MONGOOSE_CONNECTED_MESSAGE + process.env.MONGODB_DATABASE_NAME);
});

mongoose.connection.on('disconnected', () => {
  console.log(process.env.MONGOOSE_DISCONNECTED_MESSAGE + process.env.MONGODB_DATABASE_NAME);
});

mongoose.connection.on('error', (error) => {
  console.log(process.env.MONGOOSE_CONNECTION_ERROR_MESSAGE + error);
});

process.on('SIGINT', () => {
  mongoose.disconnect()
    .then(() => (() => {
      console.log(process.env.SIGINT_MESSAGE);
      process.exit(0);
    }));
});
