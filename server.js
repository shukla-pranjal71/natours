const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION. Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }) //returs a promise which is then handled by 'then'
  .then((con) => {
    // console.log(con.connections);
    console.log('DB CONNECTION SUCCESSFUL');
  });

// Specifying Schema

// const testTour = new Tour({
//   name: 'The Park Camper',
//   rating: 4.7,
//   price: 997,
// });

// testTour
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.log('ERROR:', err);
//   });

// console.log(app.get('env')); // will return development; set by Express
// console.log(process.env); // clear nodejs declaration for environmental variables
const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}....`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED PROMISE REJECTION. Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('SIGTERM RECIEVED. Shutting down gracefully');
  server.close(() => {
    console.log('Process Terminating');
  });
});
