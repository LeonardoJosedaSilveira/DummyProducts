require('dotenv').config();

const { MongoClient } = require("mongodb");

const dbName = process.env.DBNAME;
const uri = process.env.MONGOURL;

let db = null;

const connection = () => (db
    ? Promise.resolve(db)
    : MongoClient.connect(uri)
      .then((conn) => {
        db = conn.db(dbName);
        return db;
      })
      .catch((err) => console.error(err)));

module.exports = connection;
