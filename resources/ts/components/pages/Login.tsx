import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { useAuth } from "../../providers/Auth/AuthProvider";
import { MenuDrawer } from "../molecules/MenuDrawer";
import { BasicInputArea } from "../organisms/form/auth/BasicInputArea";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { ErrorMessage } from "../molecules/form/ErrorMessage";

import {
    CodeSandboxLogoIcon
} from "@radix-ui/react-icons";

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
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const auth = useAuth();

    const onSubmit = (data: LoginData) => {
        setLoading(true);
        axios.get("/sanctum/csrf-cookie").then(() => {
            auth?.signin(data)
                .then(() => {
                    history.push("/mypage");
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
        <>
            <header className="flex justify-between px-4 py-6 mx-auto bg-teal-400">
                <div>
                    <CodeSandboxLogoIcon />
                </div>
                <MenuDrawer />
            </header>
            <div className="p-4 max-w-screen-sm mx-auto">
                <h1 className="text-center text-xl font-bold pb-4">ログイン</h1>
                <p className="text-center text-blue-600 hover:text-blue-400">
                    <Link to="/register" className="text-sm">
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
                    <BasicInputArea
                        type="email"
                        id="email"
                        register={register}
                    />
                    <BasicInputArea
                        type="password"
                        id="password"
                        register={register}
                    />

                    <ErrorMessage errors={errors} />

                    <div className="text-center">
                        <PrimaryButton type="submit" text="Login" />
                    </div>
                </form>
            </div>
        </>
    );
};
