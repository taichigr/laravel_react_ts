// features/auth/validation.ts
import * as yup from "yup";

// 
const validateName = (name: string) =>
    yup
        .string()
        .required("ユーザー名は必須です")
        .min(3, "ユーザー名は3文字以上で入力してください")
        .max(50, "ユーザー名は50文字以下で入力してください")
        .isValid(name);

const validateEmail = (email: string) =>
    yup
        .string()
        .email("有効なメールアドレスを入力してください")
        .required("メールアドレスは必須です")
        .max(255, "メールアドレスは255文字以下で入力してください")
        .isValid(email);

export const validateProfileForm = async (data: {
    name: string;
    email: string;
}) => {
    const nameValid = await validateName(data.name);
    const emailValid = await validateEmail(data.email);

    return {
        name: nameValid ? null : "ユーザー名が無効です",
        email: emailValid ? null : "メールアドレスが無効です",
    };
};
