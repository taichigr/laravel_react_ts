import { axios } from "../../../lib/axios";
import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { Volume, VolumesResponse } from "../types";


export const fetchBookList = (word: string) => {
    return axios.get<VolumesResponse>(
        `https://www.googleapis.com/books/v1/volumes?q=${word}`
    );
};