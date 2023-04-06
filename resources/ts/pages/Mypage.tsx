import React, { memo, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../lib/Auth";
import { fetchUserBookListApi } from "../features/mypage/api";
import { ReadingRecord } from "../features/mypage/types";
import { UserProfile } from "../features/mypage/components/UserProfile";
import { ReadingRecordItemCard } from "../features/mypage/components/ReadingRecordItemCard";
import { axios } from "../lib/axios";

export const Mypage = memo(() => {
    const [selectedValue, setSelectedValue] = useState<string>("");
    const [userBookList, setUserBookList] = useState<ReadingRecord[]>([]);

    const history = useHistory();
    const auth = useAuth();

    const fetchUserBookList = async (status: string) => {
        try {
            const { data } = await fetchUserBookListApi(status);
            setUserBookList(data);
        } catch (error) {
            console.log("Error fetching book:", error);
        }
    };

    useEffect(() => {
        fetchUserBookList(selectedValue);
    }, [selectedValue]);

    const onChangeReadingStatus = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setSelectedValue(event.target.value);
    };

    return (
        <>
            <div className="p-2 max-w-screen-sm mx-auto">
                <UserProfile name={auth.user.name} />
            </div>
            <div>
                <p>登録した本</p>
                <select
                    value={selectedValue || ""}
                    onChange={onChangeReadingStatus}
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                    <option value="">全部</option>
                    <option value="to_read">読みたい</option>
                    <option value="reading">読んでいる途中</option>
                    <option value="finished">読み終わった</option>
                    <option value="unread">積読</option>
                </select>
            </div>
            {userBookList.map((item, index) => (
                <ReadingRecordItemCard key={index} record={item} />
            ))}
        </>
    );
});
