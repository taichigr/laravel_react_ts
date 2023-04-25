// src/features/bookDetail/hooks/useShowReviewButton.ts
import { useCallback, useEffect, useState } from "react";
import { useCheckUserBookRecord } from "./useCheckUserBookRecord";

export const useShowReviewButton = (
    userId: number | null,
    googleBooksId: string
) => {
    const [showReviewButton, setShowReviewButton] = useState(false);
    const { recordExists, recordStatus } = useCheckUserBookRecord(userId, googleBooksId);

    useEffect(() => {
        setShowReviewButton(recordExists);
    }, [recordExists]);

    const handleStatusChange = useCallback((newStatus) => {
        setShowReviewButton(newStatus !== null);
    }, []);

    return { showReviewButton, handleStatusChange, recordStatus };
};
