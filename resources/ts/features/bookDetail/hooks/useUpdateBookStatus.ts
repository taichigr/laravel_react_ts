import { useState } from "react";
import { updateReadingStatus } from "../api";

interface Props {
    bookId: string;
    title: string;
    author: string;
    publisher: string;
    imageUrl: string;
}

export const useUpdateBookStatus = ({
    bookId,
    title,
    author,
    publisher,
    imageUrl,
}: Props) => {
    const [selectedValue, setSelectedValue] = useState("");

    const handleChange = async (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const status = event.target.value;
        setSelectedValue(status);


        // ログイン状態の時はモーダルを出す
        // ログイン状態のによって値を

        try {
            await updateReadingStatus(
                status,
                bookId,
                title,
                author,
                publisher,
                imageUrl
            );
        } catch (error) {
            console.error(error);
        }
    };

    return { selectedValue, handleChange };
};
