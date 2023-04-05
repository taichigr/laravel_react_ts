import React, { memo, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../lib/Auth";
import { fetchBookList } from "../features/search/api";
import { PrimaryOnClickButton } from "../components/Elements/Button/PrimaryOnClickButton";
import { InputField } from "../components/Elements/Input";
import { Volume } from "../features/search/types";
import { BookCard } from "../features/search/components/BookCard";

export const SearchBooks = memo(() => {
    const history = useHistory();
    const auth = useAuth();

    const savedSearchWord = JSON.parse(
        localStorage.getItem("searchWord") || "{}"
    );
    const savedSearchResult = JSON.parse(
        localStorage.getItem("searchResult") || "{}"
    );

    const [inputWord, setInputWord] = useState(savedSearchWord.value || "");
    const [bookList, setBookList] = useState<Volume[]>(
        savedSearchResult.value || []
    );

    const search = async (word: string) => {
        const response = await fetchBookList(word);
        if (response.status == 200) {
            setBookList(response.data.items);
        }
    };

    useEffect(() => {
        const expirationTime = Date.now() + 86400000;
        localStorage.setItem(
            "searchWord",
            JSON.stringify({ value: inputWord, expiration: expirationTime })
        );
        localStorage.setItem(
            "searchResult",
            JSON.stringify({ value: bookList, expiration: expirationTime })
        );
    }, [inputWord, bookList]);

    useEffect(() => {
        const checkExpiration = (key: string) => {
            const data = JSON.parse(localStorage.getItem(key) || "{}");
            if (data.expiration && data.expiration < Date.now()) {
                localStorage.removeItem(key);
            }
        };

        checkExpiration("searchWord");
        checkExpiration("searchResult");
    }, []);

    return (
        <div className="p-2 max-w-screen-sm mx-auto">
            <div className="">
                <h1>Search Books</h1>
                <div>
                    <InputField
                        type="text"
                        id="input_word"
                        label="search word"
                        value={inputWord}
                        onChange={(event) => setInputWord(event.target.value)}
                    />
                    <div className="text-right">
                        <PrimaryOnClickButton
                            type="button"
                            text="search"
                            onClick={() => search(inputWord)}
                        />
                    </div>
                </div>
                <div>
                    {bookList.map((item) => {
                        return <BookCard item={item} />;
                    })}
                </div>
            </div>
        </div>
    );
});
