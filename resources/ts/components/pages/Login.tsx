import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useAuth } from "../../providers/Auth/AuthProvider";

interface LoginData {
    email: string;
    password: string;
}

export const Login = () => {
    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm();
    const navigation = useNavigate();
    const [loading, setLoading] = useState(false);
    const auth = useAuth();

    const onSubmit = (data: LoginData) => {
        setLoading(true);
        axios.get("/sanctum/csrf-cookie").then(() => {
            auth?.signin(data)
                .then(() => {
                    navigation("/mypage");
                })
                .catch((error) => {
                    console.log(error);
                    setError("submit", {
                        type: "manual",
                        message: "ログインに失敗しました",
                    });
                    setLoading(false);
                });
        });
    };

    return (
        <div className="p-4 max-w-screen-sm mx-auto">
            <h1 className="text-center text-xl font-bold pb-4">ログイン</h1>
            <p className="text-center">
                <Link to="/register" className="text-sm c-link">
                    アカウントを持っていない方はこちら
                </Link>
            </p>
            <form
                className="py-4"
                onSubmit={(e) => {
                    clearErrors();
                    handleSubmit(onSubmit)(e);
                }}
            >
                <div className="py-4">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        {...register("email", {
                            required: "入力してください",
                        })}
                    />
                    {errors.email && (
                        <span className="block text-red-400">
                            {errors.email.message}
                        </span>
                    )}
                </div>
                <div className="py-4">
                    <label htmlFor="password">Email</label>
                    <input
                        type="password"
                        id="password"
                        {...register("password", {
                            required: "入力してください",
                        })}
                    />
                    {errors.password && (
                        <span className="block text-red-400">
                            {errors.password.message}
                        </span>
                    )}
                </div>
                <div className="text-center">
                    <div>
                        <button
                            type="submit"
                            className="py-4 px-6 bg-orange-500 rounded-lg"
                        >
                            login
                        </button>
                    </div>
                    {errors.submit && (
                        <span className="block text-red-400">
                            {errors.submit.message}
                        </span>
                    )}
                </div>
            </form>
        </div>
    );
};
