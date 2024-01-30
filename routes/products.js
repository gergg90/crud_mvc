import { Router } from "express";
import { createRequire } from "node:module";
import {
  validatePartialProduct,
  validateProduct,
} from "../schema/productSchema.js";

const require = createRequire(import.meta.url);
const products = require("../products.json");

export const productRouter = Router();

productRouter.get("/", (req, res) => {
  res.json(products);
});

productRouter.get("/:id", (req, res) => {
  const { id } = req.params;

  const product = products.find((product) => product.id === parseInt(id));

  if (!product) return res.status(404).json({ message: "Product Not Found" });

  res.json(product);
});

productRouter.post("/", (req, res) => {
  const result = validateProduct(req.body);

  if (!result.success) {
    return res.status(400).json({ message: JSON.parse(result.error.message) });
  }

  products.push(result.data);

  res.status(201).json(result.data);
});

productRouter.patch("/:id", (req, res) => {
  const result = validatePartialProduct(req.body);

  if (!result.success) {
    return res.status(400).json({ message: JSON.parse(result.error.message) });
  }

  const { id } = req.params;

  const findIndex = products.findIndex(
    (product) => product.id === parseInt(id)
  );

  if (findIndex === -1) {
    return res.status(400).json({ message: "Product Not Found" });
  }

  const productModified = {
    ...products[findIndex],
    ...result.data,
  };

  products[findIndex] = productModified;
  res.status(200).json(productModified);
});

productRouter.delete("/:id", (req, res) => {
  const { id } = req.params;

  const productId = products.findIndex(
    (product) => product.id === parseInt(id)
  );
  if (productId == -1) {
    return res.status(400).json({ message: "Product Not found" });
  }

  products.splice(productId, 1);

  res.status(204).send();
});
