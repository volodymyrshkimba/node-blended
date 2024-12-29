import {
  getAllProducts,
  createProduct,
  getProductById,
  deleteProduct,
  updateProduct,
} from '../services/products.js';

import createHttpError from 'http-errors';

export const getAllProductsController = async (req, res) => {
  const userId = req.user._id;
  const products = await getAllProducts(userId);

  res.json({
    status: 200,
    message: 'Successfully found products!',
    data: products,
  });
};

export const createProductController = async (req, res) => {
  const userId = req.user._id;
  const product = await createProduct(req.body, userId);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a product!',
    data: product,
  });
};

export const getProductByIdController = async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.params;
  const product = await getProductById(productId, userId);

  if (!product) {
    throw createHttpError(404, 'Product not found');
  }

  res.json({
    status: 200,
    message: `Successfully found product with id ${productId}!`,
    data: product,
  });
};

export const deleteProductController = async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.params;
  const product = await deleteProduct(productId, userId);

  if (!product) {
    throw createHttpError(404, 'Product not found');
  }

  // res.status(204).end();

  res.sendStatus(204);
};

export const patchProductController = async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.params;
  const product = await updateProduct(productId, req.body, userId);

  if (!product) {
    throw createHttpError(404, 'Product not found');
  }

  res.json({
    status: 200,
    message: 'Successfully patched a product!',
    data: product,
  });
};
