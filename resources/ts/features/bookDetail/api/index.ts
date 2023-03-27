import { axios } from "../../../lib/axios";
import { BookVolume } from "../types";

export const fetchBookDetail = (id: string) => {
  return axios.get<BookVolume>(
    `https://www.googleapis.com/books/v1/volumes/${id}`
  );
};

export const updateReadingStatus = (
  status: string,
  bookId: string,
  title: string,
  author: string,
  publisher: string,
  imageUrl: string
) => {
  return axios.post(`/api/book/reading_status`, {
    status,
    bookId,
    title,
    author,
    publisher,
    imageUrl,
  });
};

export const checkUserBookRecord = (bookId: string) => {
    return axios.get<{ exists: boolean, status: string | null }>(`/api/book/check_record`, {
        params: {
            book_id: bookId,
        },
    });
};