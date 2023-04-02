import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_API_URL
const id = import.meta.env.VITE_API_ID

export const fetchData = async (query) => {
    const res = await axios(`search/photos?client_id=${id}&per_page=30&page=1&query=${query}`);
    return res.data.results;
}

export const fetchNextPage = async (query, page) => {
    const res = await axios(`/search/photos?client_id=${id}&page=${page}&query=${query}&per_page=20`);
    return res.data.results
}