import React, { memo, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../lib/Auth";
import { fetchBookList } from "../features/search/api";
import { PrimaryOnClickButton } from "../components/Elements/Button/PrimaryOnClickButton";
import { InputField } from "../components/Elements/Input";
import { Volume } from "../features/search/types";
import { BookCard } from "../features/search/components/BookCard";
import {
    saveWithExpiration,
    loadWithExpiration,
} from "../features/search/utils/localStorageHelper";

export const SearchBooks = memo(() => {
    const history = useHistory();
    const auth = useAuth();

    const [inputWord, setInputWord] = useState(
        loadWithExpiration("searchWord") || ""
    );
    const [bookList, setBookList] = useState<Volume[]>(
        loadWithExpiration("searchResult") || []
    );

    const search = async (word: string) => {
        const response = await fetchBookList(word);
        if (response.status == 200) {
            setBookList(response.data.items);
        }
    };

    useEffect(() => {
        const expirationTime = 86400000; // 1日後の時刻
        saveWithExpiration("searchWord", inputWord, expirationTime);
        saveWithExpiration("searchResult", bookList, expirationTime);
    }, [inputWord, bookList]);

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
