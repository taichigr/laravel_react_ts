import { axios } from "../../../lib/axios";
import { BookVolume } from "../type";


export const fetchBookDetail = (id: string) => {
    return axios.get<BookVolume>(
        `https://www.googleapis.com/books/v1/volumes/${id}`
    );
};