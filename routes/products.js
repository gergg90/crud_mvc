import { Router } from "express";
import {
  validatePartialProduct,
  validateProduct,
} from "../schema/productSchema.js";
import { ProductModel } from "../models/product.js";

export const productRouter = Router();

productRouter.get("/", async (req, res) => {
  const { category } = req.query;

  const products = await ProductModel.getAll({ category });

  res.json(products);
});

productRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  const product = await ProductModel.findById({ id });

  if (!product) return res.status(404).json({ message: "Product Not Found" });

  res.status(200).json(product);
});

productRouter.post("/", async (req, res) => {
  const result = validateProduct(req.body);

  if (!result.success) {
    return res.status(400).json({ message: JSON.parse(result.error.message) });
  }

  const newProduct = await ProductModel.create({ input: result.data });

  res.status(201).json(newProduct);
});

productRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const result = validatePartialProduct(req.body);

  if (!result.success) {
    return res.status(400).json({ message: JSON.parse(result.error.message) });
  }

  const updateProduct = await ProductModel.findByIndex({
    id: id,
    input: result.data,
  });

  res.status(200).json(updateProduct);
});

productRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const result = await ProductModel.delete({ id });
  if (result === false) {
    return res.status(400).json({ message: "Product Not found" });
  }

  res.status(204).send();
});
