import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../providers/Auth/AuthProvider";

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
            <p className="text-center">
                <Link to="/login" className="text-sm c-link">
                    アカウントを持っている方はこちら
                </Link>
            </p>
            <form className="py-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="py-4">
                    <label htmlFor="name">name</label>
                    <input type="text" id="name" {...register("name")} />
                    {errors.name && (
                        <span className="block text-red-400">
                            {errors.name.message}
                        </span>
                    )}
                </div>
                <div className="py-4">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" {...register("email")} />
                    {errors.email && (
                        <span className="block text-red-400">
                            {errors.email.message}
                        </span>
                    )}
                </div>
                <div className="py-4">
                    <label htmlFor="password">password</label>
                    <input
                        type="password"
                        id="password"
                        {...register("password")}
                    />
                    {errors.password && (
                        <span className="block text-red-400">
                            {errors.password.message}
                        </span>
                    )}
                </div>
                <div className="py-4">
                    <label className="" htmlFor="password_confirmation">
                        password_confirmation
                    </label>
                    <input
                        type="password"
                        className="bg-gray-100"
                        id="password_confirmation"
                        {...register("password_confirmation")}
                    />
                    {errors.password_confirmation && (
                        <span className="block text-red-400">
                            {errors.password_confirmation.message}
                        </span>
                    )}
                </div>
                <div>
                    <button
                        type="submit"
                        className="py-4 px-6 bg-orange-500 rounded-lg"
                    >
                        register
                    </button>
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

export default Register;
