import React, { memo, useCallback, useEffect, useState } from "react";
import { useAuth } from "../../../lib/Auth";
import { useUpdateBookStatus } from "../hooks/useUpdateBookStatus";

interface Props {
    googleBooksId: string;
    title: string;
    author: string;
    publisher: string;
    imageUrl: string;
    defaultStatus: string;
}

export const SelectBookStatus = memo(
    ({ googleBooksId, title, author, publisher, imageUrl, defaultStatus }: Props) => {
        const auth = useAuth();

        const { selectedValue, handleChange } = useUpdateBookStatus({
            googleBooksId,
            title,
            author,
            publisher,
            imageUrl,
        });

        const handleAuthenticatedChange = useCallback(
            async (event: React.ChangeEvent<HTMLSelectElement>) => {
                if (!auth.user) {
                    alert("ログインが必要です。");
                } else {
                    handleChange(event);
                }
            },
            [auth.user, handleChange]
        );
        return (
            <div>
                <select
                    value={selectedValue || defaultStatus || ""}
                    onChange={handleAuthenticatedChange}
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                    {selectedValue || defaultStatus || (
                        <>
                            <option>未選択</option>
                        </>
                    )}
                    <option value="to_read">読みたい</option>
                    <option value="reading">読んでいる途中</option>
                    <option value="finished">読み終わった</option>
                    <option value="unread">積読</option>
                </select>
            </div>
        );
    }
);
