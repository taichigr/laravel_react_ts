import { axios } from "../lib/axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../lib/Auth";
import { fetchBookList } from "../features/search/api";

export const Home = () => {
    const [inputValue, setInputValue] = useState();
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const search = (word: string) => {
        const result = fetchBookList(word);
    }

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
        <div className="p-1">
            <h1>Home</h1>
            <p>Hello! {auth?.user?.name}</p>
            <div>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                />
                <button onClick={() => search(inputValue)}>ボタン</button>
            </div>
        </div>
    );
};
