import zod from "zod";

const ratingSchema = zod.object({
  rate: zod.number().positive(),
  count: zod.number().int().positive(),
});

const productSchema = zod.object({
  id: zod.number().positive().int(),
  title: zod.string(),
  price: zod.number().positive(),
  description: zod.string(),
  category: zod.string(),
  image: zod.string().url(),
  rating: ratingSchema,
});

export const validateProduct = (object) => {
  return productSchema.safeParse(object);
};
