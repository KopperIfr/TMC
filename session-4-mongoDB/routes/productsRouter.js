// --- productsRouter.js --- //

// Importing Router Object
import { Router } from "express";

// Initializing Router
const router = Router();

// Importing controller..
import productsController from '../controllers/productsController.js';

// Router handling routes..
router.get('/', productsController.getProducts);

router.get('/:id', productsController.getProduct);

router.post('/', productsController.addProduct);

router.put('/:id', productsController.updateProduct);

router.delete('/:id', productsController.deleteProduct);

export default router;