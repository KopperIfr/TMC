const { Router } = require('express');
const router = Router();
const { 
    getProducts, 
    getProductById, 
    updateProduct, 
    deleteProduct, 
    insertProduct
} = require('../controllers/productsController.js');

// Importing middleware
const {sayHello, isAdmin} = require('./middlewares.js');

// Passing middleware before getProducts
router.get('/', isAdmin, sayHello, getProducts);



router.get('/:id', getProductById);
router.post('/insert', insertProduct);
router.put('/update', updateProduct);
router.delete('/delete', deleteProduct);

module.exports = router;



