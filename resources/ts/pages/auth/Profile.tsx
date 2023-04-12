import React, { memo } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../lib/Auth";

import { PersonIcon } from "@radix-ui/react-icons";

export const Profile = memo(() => {
    const auth = useAuth();
    const user = auth.user;

    return (
        <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
                <div className="bg-gray-300 p-4 rounded-full text-white">
                    <PersonIcon />
                </div>
                <div className="ml-4">
                    <h1 className="text-xl font-bold">{user.name}</h1>
                </div>
            </div>
            <div className="text-gray-700">
                <h2 className="text-lg font-medium">メールアドレス</h2>
                <p className="mt-1">{user.email}</p>
            </div>
            <div className="mt-4">
                <Link
                    to="/profile/edit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
                >
                    プロフィールを編集
                </Link>
            </div>
        </div>
    );
});