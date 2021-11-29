const connection = require('./connection');
const { ObjectId } = require('mongodb');

const showAll = async (email) => {
  const list = await connection()
    .then((db) => db.collection('products').find().toArray());
  
  return list;
};

module.exports = {
  showAll
};
