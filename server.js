const Express = require('express');
const BodyParser = require('body-parser');
const Mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = Express();

(async () => {
  await Mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  app.listen(process.env.PORT);
})();
