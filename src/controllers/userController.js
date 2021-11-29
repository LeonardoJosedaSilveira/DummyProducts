const userService = require('../services/userService');

const stateCreated = 201;

const createNewUser = async (req, res, next) => {
  try {
    const user = await userService.newUser(req.body);
    return res.status(stateCreated).json({ user, message: 'User created successfully'});
  } catch (error) {
    return next(error);
  };
};

const updateSaleStatus = async (req, res, next) => {
  try {
    const updatedStatus = await userService.updateUser(req.body);

    return res.status(200).json({ message: 'Update successful' });
  } catch (error) {
    return next(error);
  };
};

module.exports = {
  createNewUser,
  updateSaleStatus
};
