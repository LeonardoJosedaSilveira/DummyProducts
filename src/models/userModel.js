const connection = require('./connection');

const create = async (name, email, password, role) => {
  const userCreated = await connection()
    .then((db) => db.collection('users').insertOne({ name, email, password, role }));

  const user = await findUser(email);

  if (user == null)
    return userCreated;
  
  return user;
};

const findUser = async (email) => {
  const user = await connection()
    .then((db) => db.collection('users').findOne({ email }, {projection: { _id: 0}}));
  
  return user;
};

module.exports = {
  create,
  findUser
};
