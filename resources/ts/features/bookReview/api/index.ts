import { axios } from "../../../lib/axios";
import { BookVolume } from "../../bookDetail/types";

export const fetchBookDetail = (id: string) => {
    return axios.get<BookVolume>(
        `https://www.googleapis.com/books/v1/volumes/${id}`
    );
};

export const fetchBookFromBackend = async (book: BookVolume) => {
    const googleBooksId = book.id;
    const response = await axios.post(`/api/book/find-book-by-googlebooksid`, {
        google_books_id: googleBooksId,
    });
    return response.data;
};

export const storeOrUpdateReview = (
    bookId: number,
    rating: number,
    comment: string
) => {
    return axios.post(`/api/reviews/storeOrUpdate`, {
        book_id: bookId,
        rating,
        comment,
    });
};
