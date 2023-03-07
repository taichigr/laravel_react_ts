import axios from "axios";
import React from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../lib/AuthProvider";

export const Home = () => {
    const history = useHistory();
    const auth = useAuth();
    const logout = () => {
        axios.get("/sanctum/csrf-cookie").then(() => {
            auth?.signout().then(() => {
                history.push("/login");
            });
        });
    };
    return (
        <div className="p-4">
            <h1>Home</h1>
            <p>Hello! {auth?.user?.name}</p>
        </div>
    );
};
