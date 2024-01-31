import { Router } from "express";
import { ProductController } from "../controller/product.js";

export const productRouter = Router();

productRouter.get("/", ProductController.getAll);

productRouter.get("/:id", ProductController.findById);

productRouter.post("/", ProductController.createProduct);

productRouter.patch("/:id", ProductController.update);

productRouter.delete("/:id", ProductController.delete);
