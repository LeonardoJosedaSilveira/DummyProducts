const md5 = require('md5');
const validator = require('validator');
const { create, findUser } = require('../models/userModel');

const errorResponse = { status: 400, message: 'Invalid entries. Try again.' };
const weakPassword = { status: 400, message: 'Weak password' };

const validFilds = (userInfo) => {
  const fields = ['name', 'email', 'password'];
  let index = 0;

  for (const value in userInfo) {
    if (value != fields[index]) throw errorResponse;
    index += 1;
  };
};

const emptyValues = (userInfo) => {
  for (const value in userInfo) {
    const empty = validator.isEmpty(userInfo[value])
    if (empty) throw errorResponse;
  };
};

const validValues = async (userInfo) => {
  const { name, email, password } = userInfo;

  emptyValues(userInfo);
  validName(name);
  validPassword(password);
  await validEmail(email);
};

const validEmail = async (email) => {
  const emailOk = validator.isEmail(email);
  if (!emailOk) throw errorResponse;

  const emailExist = await findUser(email);
  if (emailExist) throw errorResponse;
};

const validPassword = (password) => {
  const strongPassword = validator.isStrongPassword(password);
  if (!strongPassword) throw weakPassword;
};

const validName = (name) => {
  const options = {ignore: ' '};
  const alphaName = validator.isAlpha(name, 'pt-BR', options);
  if (!alphaName) throw errorResponse;
};

const createUser = async ({ name, email, password }) => {
  const encriptedPassword = md5(password);
  const role = 'customer';

  const register = await create(
    name,
    email,
    encriptedPassword,
    role
  );

  return register;
};

const newUser = async (userInfo) => {
  validFilds(userInfo);

  const { name, email } = userInfo;

  await validValues(userInfo);
  await createUser(userInfo);

  return { name, email, role: 'customer'};
};

module.exports = {
  newUser,
};
