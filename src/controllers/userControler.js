const userService = require('../services/userService');

const stateCreated = 201;

const createNewUser = async (req, res, next) => {
  try {
    const user = await userService.newUser(req.body);
    return res.status(stateCreated).json({ user, message: 'User created successfully'});
  } catch (error) {
    return next(error)
  };
};

module.exports = {
  createNewUser,
};
