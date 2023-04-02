import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_API_URL

export const fetchData = async (query) => {
    const res = await axios(`search/photos?client_id=Ip0XA55zY7b7-d19osq1L5btGg-YCeDZVpnnJjXqHxs&query=${query}`);
    return res.data.results;
}