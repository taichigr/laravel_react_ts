import axios from "axios";
import React from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../providers/Auth/AuthProvider";

export const Home = () => {
    const history = useHistory();
    const auth = useAuth();
    console.log(auth.user);
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
            <button
                className="m-2 rounded-lg bg-green-600 text-white p-2"
                onClick={() => history.push("/login")}
            >
                login
            </button>
            <button
                className="m-2 rounded-lg bg-green-600 text-white p-2"
                onClick={() => history.push("/register")}
            >
                register
            </button>
            <button
                className="m-2 rounded-lg bg-green-600 text-white p-2"
                onClick={logout}
            >
                logout
            </button>
        </div>
    );
};
