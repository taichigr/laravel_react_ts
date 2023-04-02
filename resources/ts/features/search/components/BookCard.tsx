import React, { VFC } from "react";
import { Link } from "react-router-dom";
import { Volume } from "../types";
import {
    getId,
    presentAuthor,
    presentText,
    trimText,
} from "../../../utils/book/Format";

interface Props {
    item: Volume;
}

export const BookCard: VFC<Props> = ({ item }) => {
    const { volumeInfo } = item;
    const { imageLinks, title, authors, publishedDate } = volumeInfo;

    return (
        <div className="flex bg-white border border-gray-200 rounded-lg shadow h-56 items-center">
            <div className="w-32">
                <img
                    loading="lazy"
                    className="object-cover w-full rounded"
                    src={imageLinks?.smallThumbnail}
                    alt=""
                />
            </div>

            <div className="p-2 leading-normal w-3/5 h-full">
                <h3 className="bold text-xl p-1 text-teal-500 hover:text-blue-500">
                    <Link to={`/book/${getId(item)}`}>
                        {trimText(title, 50)}
                    </Link>
                </h3>
                <p>{presentAuthor(authors)}</p>
                <p>{presentText(publishedDate)}</p>
            </div>
        </div>
    );
};
