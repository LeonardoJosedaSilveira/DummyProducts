const md5 = require('md5');
const { findUser } = require('../models/userModel');
const jwtCreator = require('./jwtCreator');

const notFound = { status: 401, message: 'unautorized' };
const searchUser = async (email) => {
  const selectUser = await findUser( email );
  if (!selectUser) throw notFound;

  return selectUser;
};

const login = async ({ email, password }) => {
  const selectUser = await searchUser(email);
  const { name, password: bdPass, role } = selectUser;
  const encriptedPassword = md5(password);

  if (bdPass !== encriptedPassword) throw notFound;

  const token = jwtCreator({ name, email, role });
  return { userId: selectUser.id, name, email, role, token };
};

module.exports = {
  login,
};
