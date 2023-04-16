import React, { memo, useState } from "react";
import { useParams } from "react-router-dom";
import { presentAuthor, presentText } from "../../utils/book/Format";
import { useFetchBookDetail } from "../../features/bookDetail/hooks/useFetchBookDetail";
import { useAuth } from "../../lib/Auth";

import { Link } from "react-router-dom";
import { TextareaField } from "../../components/Elements/textarea/TextAreaField";
import { ReviewData } from "../../features/bookReview/types";
import { validateReviewForm } from "../../features/bookReview/validation";
import Rating from "../../components/Elements/Rating/Rating";

export const BookReviewForm = memo(() => {
    const { bookDetail } = useFetchBookDetail();
    const auth = useAuth();
    // const userId = auth.user ? auth.user.id : 0;
    // const bookId = bookDetail ? bookDetail.id : "";

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const [errors, setErrors] = useState<{
        rating: number | null;
        comment: string | null;
    }>({
        rating: null,
        comment: null,
    });

    const handleCommentChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setComment(event.target.value);
    };
    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setRating(0);
        const formData: ReviewData = { rating, comment };
        const validationResult = await validateReviewForm(formData);

        if (validationResult.rating || validationResult.comment) {
            setErrors(validationResult);
            return;
        }

        // APIを叩いて、レビューを新規作成 or 更新
        // auth.updateProfile(formData);
        // history.push("/mypage");
    };

    return (
        <>
            {bookDetail && (
                <div className="p-2 max-w-screen-sm mx-auto mt-4">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">
                        レビューを書く
                    </h2>
                    <div className="flex bg-white border border-gray-200 rounded-lg shadow h-56 items-center">
                        <div className="w-32">
                            <img
                                src={
                                    bookDetail.volumeInfo.imageLinks
                                        ?.smallThumbnail
                                }
                                alt=""
                                className="object-cover w-full rounded"
                            />
                        </div>
                        <div className="p-2 leading-normal w-3/5 h-full">
                            <h5 className="font-bold text-gray-800">
                                {bookDetail.volumeInfo.title}
                            </h5>
                            <p className="text-gray-700">
                                {presentAuthor(bookDetail.volumeInfo.authors)}
                            </p>
                        </div>
                    </div>
                    <div className="mt-4">
                        <form onSubmit={handleSubmit}>
                            {/* レーティング（星評価）コンポーネントをここに配置 */}
                            <div className="mt-4">
                                <label
                                    className="block text-gray-800 text-sm font-semibold mb-2"
                                    htmlFor="rating"
                                >
                                    レーティング
                                </label>
                                <Rating
                                    rating={rating}
                                    changeRating={handleRatingChange}
                                />
                                {errors.rating && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.rating}
                                    </p>
                                )}
                            </div>
                            <TextareaField
                                id="comment"
                                label="コメント"
                                value={comment}
                                onChange={handleCommentChange}
                                error={errors.comment}
                            />
                            <div className="mt-4">
                                <button className="bg-teal-500 text-white font-semibold py-2 px-4 rounded hover:bg-teal-600">
                                    送信
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
});

// タスク
// 状態管理をしてデータをバックエンドに送る
// 対象：レイティング、コメント
// 一緒に送るべきデータ。book_id
