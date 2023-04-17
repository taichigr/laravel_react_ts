import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BookVolume } from "../types";
import { fetchBookDetail } from "../api";

export const useFetchBookDetail = () => {
  const [bookDetail, setBookDetail] = useState<BookVolume>();
  const urlParams = useParams<{ googleBooksId: string }>();

  const fetchBook = async (googleBooksId: string) => {
    try {
      const { data } = await fetchBookDetail(googleBooksId);
      setBookDetail(data);
    } catch (error) {
      console.log("Error fetching book:", error);
    }
  };

  useEffect(() => {
    fetchBook(urlParams.googleBooksId);
  }, [urlParams.googleBooksId]);

  return { bookDetail };
};
