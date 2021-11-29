const validToken = require('../services/tokenService');

const checkUser = async (req, res, next) => {
  try {
    const noPass = await validToken(req.headers.authorization);
    req.user = noPass;
    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  checkUser,
};