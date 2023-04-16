import React, { memo } from "react";
import { useParams } from "react-router-dom";
import { presentAuthor, presentText } from "../../utils/book/Format";
import { SelectBookStatus } from "../../features/bookDetail/components/SelectBookStatus";
import { useFetchBookDetail } from "../../features/bookDetail/hooks/useFetchBookDetail";
import { useAuth } from "../../lib/Auth";
import { useCheckUserBookRecord } from "../../features/bookDetail/hooks/useCheckUserBookRecord";

import { Link } from "react-router-dom";

export const BookDetail = memo(() => {
    const { bookDetail } = useFetchBookDetail();
    const auth = useAuth();
    const userId = auth.user ? auth.user.id : 0;
    const bookId = bookDetail ? bookDetail.id : "";
    const { recordExists, recordStatus } = useCheckUserBookRecord(
        userId,
        bookId
    );

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
                            <h5 className="font-bold text-gray-800">
                                {presentText(bookDetail.volumeInfo.title)}
                            </h5>
                            <p className="text-gray-700">
                                {presentAuthor(bookDetail.volumeInfo.authors)}
                            </p>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div>
                            <SelectBookStatus
                                bookId={bookDetail.id}
                                title={bookDetail.volumeInfo.title}
                                author={presentAuthor(
                                    bookDetail.volumeInfo.authors
                                )}
                                publisher={bookDetail.volumeInfo.publisher}
                                imageUrl={
                                    bookDetail.volumeInfo.imageLinks
                                        ?.smallThumbnail
                                }
                                defaultStatus={recordStatus}
                            />
                        </div>
                        <div className="my-4">
                            <Link
                                to={`/book/review/${bookDetail.id}`}
                                className="bg-teal-500 text-white font-semibold py-2 px-4 rounded hover:bg-teal-600"
                            >
                                レビューを書く
                            </Link>
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
