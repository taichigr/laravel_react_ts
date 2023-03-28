import { useState, useEffect } from "react";
import { checkUserBookRecord } from "../api";

export const useCheckUserBookRecord = (
    userId: number | null,
    bookId: string
) => {
    const [recordExists, setRecordExists] = useState<boolean>(false);
    const [recordStatus, setRecordStatus] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserBookRecord = async () => {
            try {
                if (!userId) {
                    return;
                }

                if (!bookId) {
                    return;
                }

                const { data } = await checkUserBookRecord(bookId);
                setRecordExists(data.exists);
                setRecordStatus(data.status);
            } catch (error) {
                console.log("Error checking user book record:", error);
            }
        };

        fetchUserBookRecord();
    }, [userId, bookId]);

    return { recordExists, recordStatus };
};
