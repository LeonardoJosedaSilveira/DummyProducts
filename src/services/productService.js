const { showAll } = require('../models/productModel');

const getAll = async () => {
  const products = await showAll();
  return products;
};

module.exports = {
  getAll,
};
