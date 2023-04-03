import { axios } from "../lib/axios";
import React, { memo, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../lib/Auth";
import { Link } from "react-router-dom";
import { PersonIcon } from "@radix-ui/react-icons";
import { fetchUserBookListApi } from "../features/mypage/api";
import { trimText } from "../utils/book/Format";

interface ReadingRecord {
    key: string;
    id: number;
    book_id: number;
    user_id: number;
    read_date: string;
    status: string;
    created_at: string;
    updated_at: string;
    book: Book;
}

interface Book {
    id: number;
    title: string;
    author: string;
    publisher: string;
    google_book_id: string;
    image_url: string;
    created_at: string;
    updated_at: string;
}

export const Mypage = memo(() => {
    const [userBookList, setUserBookList] = useState<ReadingRecord[]>();

    const fetchUserBookList = async (status: string) => {
        try {
            const { data } = await fetchUserBookListApi(status);
            setUserBookList(data);
            console.log(data);
        } catch (error) {
            console.log("Error fetching book:", error);
        }
    };

    useEffect(() => {
        fetchUserBookList("");
    }, []);
    // APIを叩くことには成功。
    // タスク。画面表示。fetch件数の制限。

    const history = useHistory();
    const auth = useAuth();
    const logout = () => {
        axios.get("/sanctum/csrf-cookie").then(() => {
            auth?.signout().then(() => {
                history.push("/login");
            });
        });
    };
    return (
        <>
            <div className="p-2 max-w-screen-sm mx-auto">
                <div className="p-2 bg-white border border-gray-200 rounded-lg shadow h-36">
                    <div className="flex items-center">
                        <div className="bg-gray-300 p-2 rounded-full text-white">
                            <PersonIcon />
                        </div>
                        <div className="ml-2">
                            <p>{auth.user.name}</p>
                        </div>
                    </div>
                    {/* ここにプロフィールのカード作成
                    アイコンと名前　クリックでプロフィール編集に遷移 */}
                    {/* 本日、APIを叩いてみて、実際に画面にリストを表示してみる。bookcardコンポーネントを使えるかと思ったが、props問題。searchの場合、
                APIを叩いて取得したデータ。マイページの場合、違う。違う目的の画面なので、共通化せず、別コンポーネントとして進めていく。
                */}
                </div>
            </div>
            {userBookList &&
                userBookList.map((item, index) => {
                    return (
                        <>
                            <div key={index} className="flex bg-white border border-gray-200 rounded-lg shadow h-56 items-center">
                                <div className="w-32">
                                    <img
                                        loading="lazy"
                                        className="object-cover w-full rounded"
                                        src={item.book.image_url}
                                        alt=""
                                    />
                                </div>

                                <div className="p-2 leading-normal w-3/5 h-full">
                                    <h3 className="bold text-xl p-1 text-teal-500 hover:text-blue-500">
                                        <Link
                                            to={`/book/${item.book.google_book_id}`}
                                        >
                                            {trimText(item.book.title, 50)}
                                        </Link>
                                    </h3>
                                    <p>{item.book.author}</p>
                                    <p>{item.book.publisher}</p>
                                    <p>{item.status}</p>
                                </div>
                            </div>
                        </>
                    );
                })}
        </>
    );
});
