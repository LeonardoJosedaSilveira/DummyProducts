require('dotenv').config();

const bodyParser = require('body-parser');
const app = require('./app');

const port = process.env.PORT || 3001;

app.use(bodyParser.json());

app.use((err, _req, res, _next) => {
  console.log(err);
  if (err.status) return res.status(err.status).json({ message: err.message});
  return res.status(500).json({ message: err.message});
});

app.listen(port)

console.log(`Server start in port ${port}`);

