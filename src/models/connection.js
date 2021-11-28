const MongoClient = require('mongodb').MongoClient;
// Connection URI
const dbName = process.env.DBNAME;
const uri = process.env.MONGOURL;
const options = { 
  useNewUrlParser: true,
  useUnifiedTopology: true
}
// Create a new MongoClient
module.exports = {
  connect: async function(callback) {
    let connection;
    await new Promise((resolve, reject) => {
      MongoClient.connect(uri, (err, database) => {
        if (err) {
          reject();
        } else {
          connection = database;
          resolve();
        }
      });
    });
    return connection;
  }
};
