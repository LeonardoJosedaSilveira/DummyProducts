const express = require('express');
const productController = require('../controllers/productCcontroller');
const tokenController = require('../controllers/tokenController')

const productRoute = express.Router();

productRoute.get('/all', tokenController.checkUser, productController.getAll)
productRoute.get('/image/:path', tokenController.checkUser, productController.getImage)

module.exports = productRoute;
