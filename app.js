import express, { json } from "express";
import { corsMiddleware } from "./middleware/cors.js";
import { productRouter } from "./routes/products.js";

const PORT = process.env.PORT ?? 4321;
const app = express();
app.disable("x-powered-by");
app.use(json());
app.use(corsMiddleware());

app.use("/products", productRouter);

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.listen(PORT, () => {
  console.log(`Server on port: http://localhost:${PORT}`);
});
