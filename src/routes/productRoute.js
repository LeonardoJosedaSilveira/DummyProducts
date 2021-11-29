const express = require('express');
const tokenController = require('../controllers/tokenController');
const productController = require('../controllers/productController');

const productRoute = express.Router();

productRoute.get('/all', tokenController.checkUser, productController.getAll);
productRoute.get('/image/:path', tokenController.checkUser, productController.getImage);

module.exports = productRoute;
