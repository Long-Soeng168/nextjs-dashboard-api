import { BASE_BACKEND_API_URL } from "@/config/env";

export async function fetchCategories({
    perPage = "10",
    page = "1",
}: {
    perPage?: string;
    page?: string;
} = {}) {
    const queryParams = new URLSearchParams({
        perPage,
        page,
    });
    try {
        const response = await fetch(`${BASE_BACKEND_API_URL}categories?${queryParams}`, {
            next: { revalidate: 3600 },
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

export async function fetchCategory({
    id
}: {
    id: number;
}) {
    try {
        const response = await fetch(`${BASE_BACKEND_API_URL}categories/${id}`, {
            next: { revalidate: 3600 },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch category id" + id);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error fetching category id:" + id, error);
        return {};
    }
}