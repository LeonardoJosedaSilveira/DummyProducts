const connection = require('./connection');
const { ObjectId } = require('mongodb');


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
    .then((db) => db.collection('users').findOne({ email }));
  
  return user;
};

const update = async (name, email, id) => {
  const user = await connection()
    .then((db) => db.collection('users')
      .updateOne({ _id: new ObjectId(id) }, { $set: { name, email} }));
  
  return user;
};

module.exports = {
  create,
  findUser,
  update
};
