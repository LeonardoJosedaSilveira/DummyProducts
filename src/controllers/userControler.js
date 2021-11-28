const userService = require('../services/userService');

const stateBadRequest = 400;
const stateCreated = 201;

const createNewUser = async (req, res, _next) => {
  const { name, email, password } = req.body;
  const stateConflict = 409;
  const newUser = await userService.createUser(name, email, password);

  if (newUser.message === 'Email already registered') {
    return res.status(stateConflict).json(newUser);
  }

  if (newUser.message) {
    newUser.message = 'Invalid entries. Try again.';
    return res.status(stateBadRequest).json(newUser);
  }

  return res.status(stateCreated).json({ message: 'User created successfully'});
};

module.exports = {
  createNewUser,
};