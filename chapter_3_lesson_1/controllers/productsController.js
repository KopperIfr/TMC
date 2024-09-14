
// --- productsController.js --- //

const Product = require('../models/Product.js');

const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        console.log('Products found: ',products);
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
    }
}
const getProductById = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        console.log('Product found: ',product);
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
    }
}

const updateProduct = async (req, res) => {
    try {

        let product = await Product.findById(req.body.id);
        console.log('Last product values: ',product);

        await Product.findByIdAndUpdate(req.body.id, req.body.new_data);

        product = await Product.findById(req.body.id);
        console.log('Updated product values: ',product);

        res.status(200).json(product);

    } catch (error) {

        console.log(error);
        res.status(500).send('Error');

    }
}
const deleteProduct = async (req, res) => {
    try {

        const deletedProduct = await Product.findByIdAndDelete(req.body.id);
        console.log('Product deleted successfully: ', deletedProduct);
        res.status(200).json(deletedProduct);

    } catch (error) {

        console.log(error);
        res.status(500).send('Error');

    }
}
const insertProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        console.log('Product added successfully:', product);
        res.status(200).json(product);
    } catch (error) {
        console.log('Product has not been added!', error);
        res.status(500).send('Some error ocurred!');
    }
}

module.exports = {
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    insertProduct
}