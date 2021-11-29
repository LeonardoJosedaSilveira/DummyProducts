require('dotenv').config();
const jwt = require('jsonwebtoken');
const { findUser } = require('../models/userModel');

const secret = process.env.SECRET;

module.exports = async (receivedToken) => {
  const decode = jwt.verify(receivedToken, secret);
  const { email } = decode
  const selectUser = await findUser(email);
  const emailNotFound = { status: 401, message: 'Expired or invalid token' };
  if (!selectUser) throw emailNotFound;

  const { password, ...nopass } = selectUser.dataValues;

  return nopass;
};