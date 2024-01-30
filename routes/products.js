import { Router } from "express";
import { createRequire } from "node:module";
import { validateProduct } from "../schema/productSchema.js";

const require = createRequire(import.meta.url);
const products = require("../products.json");

export const productRouter = Router();

productRouter.get("/", (req, res) => {
  res.json(products);
});

productRouter.get("/:id", (req, res) => {
  const { id } = req.params;

  const product = products.filter((product) => product.id === parseInt(id));

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
