import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const products = require("../../products.json");

export class ProductModel {
  static getAll = async ({ category }) => {
    if (category)
      return products.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
    return products;
  };

  static findById = async ({ id }) => {
    const productById = products.find((product) => product.id === parseInt(id));
    return productById;
  };

  static create = async ({ input }) => {
    const newProduct = {
      ...input,
    };

    products.push(newProduct);
    return newProduct;
  };

  static update = async ({ id, input }) => {
    const productByIndex = products.findIndex(
      (product) => product.id === parseInt(id)
    );

    if (productByIndex === -1) return false;

    const productModified = {
      ...products[productByIndex],
      ...input,
    };

    products[productByIndex] = productModified;

    return productModified;
  };

  static delete = async ({ id }) => {
    const productByIndex = products.findIndex(
      (product) => product.id === parseInt(id)
    );
    if (productByIndex === -1) return false;
    products.splice(productByIndex, 1);
    return true;
  };
}
