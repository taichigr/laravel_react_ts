import React, { memo, useState } from "react";
import { useHistory } from "react-router-dom";

import { useAuth } from "../../lib/Auth";
import { InputField } from "../../components/Elements/Input";
import { PrimaryButton } from "../../components/Elements";
import { ProfileData } from "../../features/auth/types";

export const EditProfile = memo(() => {
    const auth = useAuth();
    const user = auth.user;
    const history = useHistory();

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData: ProfileData = { name, email };
        auth.updateProfile(formData);
        history.push("/mypage");


        // 帰宅後。プロフィールのバリデーション
    };

    return (
        <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-md w-full max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-6">プロフィール編集</h1>
            <form onSubmit={handleSubmit}>
                <InputField
                    type="text"
                    id="name"
                    label="ユーザー名"
                    value={name}
                    onChange={handleNameChange}
                />
                <InputField
                    type="email"
                    id="email"
                    label="メールアドレス"
                    value={email}
                    onChange={handleEmailChange}
                />
                <div className="flex items-center justify-between mt-2">
                    <PrimaryButton type="submit" text="更新" />
                </div>
            </form>
        </div>
    );
});
