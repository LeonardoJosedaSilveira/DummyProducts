const cors = require('cors')
const express = require('express');
const bodyParser = require('body-parser');
const userRoute = require('../routes/userRoute');
const productRoute = require('../routes/productRoute');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/user', userRoute);
app.use('/product', productRoute);

app.use((err, _req, res, _next) => {
  console.log(err);
  if (err.status) return res.status(err.status).json({ message: err.message});
  return res.status(500).json({ message: err.message});
});

module.exports = app;
