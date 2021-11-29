const path = require('path');
const productsService = require('../services/productService');

const getAll = async (_req, res, next) => {
  try {
    const products = await productsService.getAll();
    return res.status(200).json(products);
  } catch (error) {
    return next(error);
  };
};

const getImage = (req, res, next) => {
  try {
    const imgPathReceived = req.url;
    const pathImage = path.resolve(`public/${imgPathReceived}`);
    return res.status(200).sendFile(pathImage);
  } catch (error) {
    return next(error);
  };
};

module.exports = {
  getAll,
  getImage,
};
