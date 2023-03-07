import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../providers/Auth/AuthProvider";
import { BasicInputArea } from "../Form/BasicInputArea";
import { ErrorMessage } from "../Form/ErrorMessage";
import { PrimaryButton } from "../Elements/Button/PrimaryButton";

interface EmailAndPasswordData {
    email: string;
    password: string;
    password_confirmation: string;
}

const Register = () => {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const auth = useAuth();

    const onSubmit = (data: EmailAndPasswordData) => {
        setLoading(true);
        axios.get("/sanctum/csrf-cookie").then(() => {
            auth?.register(data)
                .then(() => {
                    history.push("/mypage");
                })
                .catch((error) => {
                    console.log(error);
                    setError("submit", {
                        type: "manual",
                        message: "登録に失敗しました。再度登録をしてください",
                    });
                    setLoading(false);
                });
        });
    };

    return (
        <div className="p-4 max-w-screen-sm mx-auto">
            <h1 className="text-center text-xl font-bold">アカウント作成</h1>
            <p className="text-center text-blue-600 hover:text-blue-400">
                <Link to="/login" className="text-sm">
                    アカウントを持っている方はこちら
                </Link>
            </p>
            <form className="py-4" onSubmit={handleSubmit(onSubmit)}>
                <BasicInputArea
                    type="name"
                    id="name"
                    label="name"
                    register={register}
                    errors={errors}
                />

                <BasicInputArea
                    type="email"
                    id="email"
                    label="email"
                    register={register}
                    errors={errors}
                />

                <BasicInputArea
                    type="password"
                    id="password"
                    label="password"
                    register={register}
                    errors={errors}
                />
                <BasicInputArea
                    type="password"
                    id="password_confirmation"
                    label="password(confirm)"
                    register={register}
                    errors={errors}
                />

                <div className="text-right mt-10">
                    <PrimaryButton type="submit" text="Register" />
                </div>
                <ErrorMessage id="submit" errors={errors} />
            </form>
        </div>
    );
};

export default Register;
