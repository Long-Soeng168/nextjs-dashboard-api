import { BASE_BACKEND_API_URL } from "@/config/env";

export async function fetchCategories() {
    try {
        const response = await fetch(BASE_BACKEND_API_URL + "categories", {
            next: { revalidate: 3600 }, // Revalidate data every hour (optional for caching)
        });

        if (!response.ok) {
            throw new Error("Failed to fetch categories");
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error fetching categories:", error);
        return []; // Return an empty array or a fallback value
    }
}