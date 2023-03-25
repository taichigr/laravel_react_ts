import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BookVolume } from "../types";
import { fetchBookDetail } from "../api";

export const useFetchBookDetail = () => {
  const [bookDetail, setBookDetail] = useState<BookVolume>();
  const urlParams = useParams<{ id: string }>();

  const fetchBook = async (id: string) => {
    try {
      const { data } = await fetchBookDetail(id);
      setBookDetail(data);
    } catch (error) {
      console.log("Error fetching book:", error);
    }
  };

  useEffect(() => {
    fetchBook(urlParams.id);
  }, [urlParams.id]);

  return { bookDetail };
};
