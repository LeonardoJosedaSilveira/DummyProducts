const connection = require('./connection');


const create = async (name, email, password, role) => {
  const userCreated = await connection()
    .then((db) => db.collection('users').insertOne({ name, email, password, role }));

  return userCreated;
};

module.exports = {
  create,
};
