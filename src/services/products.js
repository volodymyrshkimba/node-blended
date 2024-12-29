import { ProductModel } from '../db/models/Product.js';

export const getAllProducts = (userId) => ProductModel.find({ userId });

export const createProduct = (productData, userId) =>
  ProductModel.create({ ...productData, userId });

// export const getProductById = (productId) => ProductModel.findById(productId);

export const getProductById = (productId, userId) =>
  ProductModel.findOne({
    _id: productId,
    userId,
  });

// export const deleteProduct = (productId) => ProductModel.findByIdAndDelete(productId);

export const deleteProduct = (productId, userId) =>
  ProductModel.findOneAndDelete({
    _id: productId,
    userId,
  });

// export const updateProduct = (productId, productData) => ProductModel.findByIdAndUpdate(productId, productData, { new: true });

export const updateProduct = (productId, productData, userId) =>
  ProductModel.findOneAndUpdate(
    {
      _id: productId,
      userId,
    },
    productData,
    { new: true },
  );
