import { axios } from "../../../lib/axios";
import { BookVolume } from "../types";

export const fetchBookDetail = (googleBooksId: string) => {
  return axios.get<BookVolume>(
    `https://www.googleapis.com/books/v1/volumes/${googleBooksId}`
  );
};

export const updateReadingStatus = (
  status: string,
  googleBooksId: string,
  title: string,
  author: string,
  publisher: string,
  imageUrl: string
) => {
  return axios.post(`/api/book/reading_status`, {
    status,
    googleBooksId,
    title,
    author,
    publisher,
    imageUrl,
  });
};

export const checkUserBookRecord = (googleBooksId: string) => {
    return axios.get<{ exists: boolean, status: string | null }>(`/api/book/check_record`, {
        params: {
            google_books_id: googleBooksId,
        },
    });
};