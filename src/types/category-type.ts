// schemas.ts
import { z } from "zod";

// Define the schema for a single category
export const CategorySchema = z.object({
  id: z.number(),
  code: z.string(),
  parent_code: z.string().nullable(),
  title: z.string(),
  title_kh: z.string(),
  order_index: z.coerce.number(),
  created_at: z.string(),
  updated_at: z.string(),
  image: z.string().optional().nullable(), // Optional image URL
});

// Define the schema for the array of categories
export const CategoriesSchema = z.array(CategorySchema);

// Infer the TypeScript type from the schema
export type Category = z.infer<typeof CategorySchema>;