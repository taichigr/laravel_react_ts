import React, { memo, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../lib/Auth";
import { fetchBookList } from "../features/search/api";
import { PrimaryOnClickButton } from "../components/Elements/Button/PrimaryOnClickButton";
import { InputField } from "../components/Elements/Input";
import { Volume } from "../features/search/types";
import { BookCard } from "../features/search/components/BookCard";

export const SearchBooks = memo(() => {
    const [inputWord, setInputWord] = useState("");
    const [bookList, setBookList] = useState<Volume[]>([]);

    const search = async (word: string) => {
        const response = await fetchBookList(word);
        if (response.status == 200) {
            setBookList(response.data.items);
        }
    };

    const history = useHistory();
    const auth = useAuth();

    return (
        <div className="p-2 max-w-screen-sm mx-auto">
            <div className="">
                <h1>Search Books</h1>
                <div>
                    <InputField
                        type="text"
                        id="input_word"
                        label="search word"
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
