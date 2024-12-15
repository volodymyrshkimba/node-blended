import {
  createProductController,
  deleteProductController,
  getAllProductsController,
  getProductByIdController,
  patchProductController,
} from '../controllers/products.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { Router } from 'express';

const router = Router();

router.get('/', ctrlWrapper(getAllProductsController));

router.post('/', ctrlWrapper(createProductController));

router.get('/:productId', ctrlWrapper(getProductByIdController));

router.delete('/:productId', ctrlWrapper(deleteProductController));

router.patch('/:productId', ctrlWrapper(patchProductController));

export default router;
