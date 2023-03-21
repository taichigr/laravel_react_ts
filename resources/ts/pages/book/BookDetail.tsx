import React, { memo, useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { useAuth } from "../../lib/Auth";
import { fetchBookDetail } from "../../features/bookDetail/api";
import {
    getId,
    getPrefixedIdentifier,
    presentAuthor,
    presentText,
    trimText,
} from "../../utils/book/Format";
import { BookVolume } from "../../features/bookDetail/type";
import { PrimaryButton } from "../../components/Elements";

export const BookDetail = memo(() => {
    const history = useHistory();
    const auth = useAuth();

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

    console.log(bookDetail);

    // getPrefixedIdentifier(bookDetail.volumeInfo.industryIdentifiers);

    return (
        <>
            {bookDetail && (
                <div className="p-2 max-w-screen-sm mx-auto">
                    <div className="flex bg-white border border-gray-200 rounded-lg shadow h-56 items-center">
                        <div className="w-32">
                            <img
                                loading="lazy"
                                className="object-cover w-full rounded"
                                src={
                                    bookDetail.volumeInfo.imageLinks
                                        ?.smallThumbnail
                                }
                                alt=""
                            />
                        </div>
                        <div className="p-2 leading-normal w-3/5 h-full">
                            <h5 className="bold">
                                {presentText(bookDetail.volumeInfo.title)}
                            </h5>
                            <p>
                                {presentAuthor(bookDetail.volumeInfo.authors)}
                            </p>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div>
                            <PrimaryButton type='button' text='本棚に登録する' />
                            {/* モーダルを出して、読みたい、読んでいる途中、読み終わった、積読を選ばせる */}
                        </div>
                    </div>
                    <div className="p-2 mt-4">
                        <div>
                            <h3 className="text-2xl">作品詳細</h3>
                            <p className="font-normal">
                                {bookDetail.volumeInfo.description ?? ""}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
});
