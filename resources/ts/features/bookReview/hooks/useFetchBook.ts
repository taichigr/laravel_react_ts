import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BookVolume } from "../../bookDetail/types";
import { fetchBookDetail, fetchBookFromBackend } from "../api";

export const useFetchBook = () => {
    const [bookDetail, setBookDetail] = useState<BookVolume>();
    const [book, setBook] = useState<any | null>(null);
    const [review, setReview] = useState<any | null>(null);
    const urlParams = useParams<{ id: string }>();

    const fetchBook = async (id: string) => {
        try {
            const { data } = await fetchBookDetail(id);
            setBookDetail(data);

            const backendData = await fetchBookFromBackend(data);

            setBook(backendData.book);
            setReview(backendData.review);
        } catch (error) {
            console.log("Error fetching book:", error);
        }
    };

    useEffect(() => {
        fetchBook(urlParams.id);
    }, [urlParams.id]);

    return { bookDetail, book, review };
};
