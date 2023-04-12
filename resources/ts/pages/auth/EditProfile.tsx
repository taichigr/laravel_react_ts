import React, { memo, useState } from "react";
import { useHistory } from "react-router-dom";

import { useAuth } from "../../lib/Auth";
import { InputField } from "../../components/Elements/Input";
import { PrimaryButton } from "../../components/Elements";
import { ProfileData } from "../../features/auth/types";
import { validateProfileForm } from "../../features/auth/validation";

export const EditProfile = memo(() => {
    const auth = useAuth();
    const user = auth.user;
    const history = useHistory();

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [errors, setErrors] = useState<{
        name: string | null;
        email: string | null;
    }>({ name: null, email: null });

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData: ProfileData = { name, email };
        const validationResult = await validateProfileForm(formData);

        if (validationResult.name || validationResult.email) {
            setErrors(validationResult);
            return;
        }

        auth.updateProfile(formData);
        history.push("/mypage");
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
                    error={errors.name}
                />
                <InputField
                    type="email"
                    id="email"
                    label="メールアドレス"
                    value={email}
                    onChange={handleEmailChange}
                    error={errors.email}
                />
                <div className="flex items-center justify-between mt-2">
                    <PrimaryButton type="submit" text="更新" />
                </div>
            </form>
        </div>
    );
});
