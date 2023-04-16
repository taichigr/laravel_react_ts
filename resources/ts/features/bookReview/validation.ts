// features/bookReview/validation.ts
import * as yup from "yup";

const validateRating = (rating: number) =>
    yup
        .number()
        .required("レーティングは必須です")
        .min(1, "レーティングは1以上である必要があります")
        .max(5, "レーティングは5以下である必要があります")
        .validate(rating);

const validateReview = (comment: string) =>
    yup
        .string()
        .required("レビューは必須です")
        .min(3, "レビューは3文字以上で入力してください")
        .max(250, "レビューは250文字以下で入力してください")
        .validate(comment);

export const validateReviewForm = async (data: {
    rating: number;
    comment: string;
}) => {
    let errors = {
        rating: null,
        comment: null,
    };

    try {
        await validateRating(data.rating);
    } catch (error) {
        errors.rating = error.message;
    }

    try {
        await validateReview(data.comment);
    } catch (error) {
        errors.comment = error.message;
    }

    return errors;
};
