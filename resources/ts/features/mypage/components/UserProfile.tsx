import React, { VFC } from "react";
import { PersonIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

type Props = {
    name: string;
};

export const UserProfile: VFC<Props> = ({ name }) => {
    return (
        <div className="p-2 bg-white border border-gray-200 rounded-lg shadow h-36">
            <Link to="/profile">
                <div className="flex items-center mb-4">
                    <div className="bg-gray-300 p-4 rounded-full text-white">
                        <PersonIcon />
                    </div>
                    <div className="ml-4">
                        <h1 className="text-xl font-bold">{name}</h1>
                    </div>
                </div>
            </Link>
        </div>
    );
};
