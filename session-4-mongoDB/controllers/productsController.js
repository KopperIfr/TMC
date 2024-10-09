import Product from "../models/Product.js";

const Controller = {

    addProduct : async (req, res) => {
        await Product.create({
            name: 'Pizza',
            description: 'Pizza Description',
            price: 19.99,
            quantity: 261
        })
        res.status(200).json({
            message: 'Product added!'
        })
    },

    getProduct : async (req, res) => {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json({product});
    },

    getProducts : async (req, res) => {
        const products = await Product.find();
        res.status(200).json({products});
    },

    updateProduct : async (req, res) => {
        const { id } = req.params;
        const { name, description, price, quantity } = req.body
        await Product.findByIdAndUpdate(id, {
            name, description, price, quantity
        })
        res.status(200).json({message: 'Product updated!'})
    },

    deleteProduct : async (req, res) => {
        const { id } = req.params;
        await Product.findByIdAndDelete(id);
        res.status(200).json({message: 'Product deleted!'})
    }

}

export default Controller;