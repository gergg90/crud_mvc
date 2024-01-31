import { ProductModel } from "../models/local-file-system/product.js";
import {
  validateProduct,
  validatePartialProduct,
} from "../schema/productSchema.js";

export class ProductController {
  static getAll = async (req, res) => {
    const { category } = req.query;
    const products = await ProductModel.getAll({ category });

    res.status(200).json(products);
  };

  static createProduct = async (req, res) => {
    const result = validateProduct(req.body);
    if (!result.success) {
      return res
        .status(400)
        .json({ message: JSON.parse(result.error.message) });
    }

    const newProduct = await ProductModel.create({ input: result.data });
    res.status(201).json(newProduct);
  };

  static findById = async (req, res) => {
    const { id } = req.params;

    const product = await ProductModel.findById({ id });
    if (!product) {
      return res.status(400).json({ message: "Product Not Found" });
    }
    res.status(200).json(product);
  };

  static update = async (req, res) => {
    const result = validatePartialProduct(req.body);
    const { id } = req.params;

    if (!result.success) {
      return res
        .status(400)
        .json({ message: JSON.parse(result.error.message) });
    }

    const updateProduct = await ProductModel.update({
      id: id,
      input: result.data,
    });

    res.status(200).json(updateProduct);
  };

  static delete = async (req, res) => {
    const { id } = req.params;

    const result = await ProductModel.delete({ id });

    if (result === false) {
      return res.status(400).json({ message: "Product Not Found" });
    }

    res.status(200).json({ message: "Product Deleted" });
  };
}
