import { Router } from "express";
import {
  validatePartialProduct,
  validateProduct,
} from "../schema/productSchema.js";
import { ProductModel } from "../models/product.js";
import { ProductController } from "../controller/product.js";

export const productRouter = Router();

productRouter.get("/", ProductController.getAll);

productRouter.get("/:id", ProductController.findById);

productRouter.post("/", ProductController.createProduct);

productRouter.patch("/:id", ProductController.update);

productRouter.delete("/:id", ProductController.delete);
