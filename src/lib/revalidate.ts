"use server";

import { revalidatePath } from "next/cache";

export async function revalidateCategories(path: string) {
  revalidatePath(path, 'layout');
}
