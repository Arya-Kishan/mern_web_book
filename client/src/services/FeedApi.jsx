import { axiosBaseQuery } from "./AxiosApi";

export const getAllPostsAsync = async ({ page, limit, query }) => {
    try {
        const axiosInstance = axiosBaseQuery({ baseUrl: import.meta.env.VITE_SERVER_BASE_URL });
        const { data } = await axiosInstance({ url: `/post/all?page=${page}&limit=${limit}${query ? "&tags=" + query : ""}`, method: "GET", body: "", params: "" });
        return data.data;
    } catch (error) {
        console.log(error);
        return [];
    }
}

// setQuery(`page=${page}&limit=${allowedLimit}${selectedTags.length > 0 ? "&tags=" + selectedTags : ""}`);