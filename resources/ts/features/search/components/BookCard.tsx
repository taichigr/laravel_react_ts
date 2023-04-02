import React, { memo, useState, VFC } from "react";
import { useHistory } from "react-router-dom";
import { Volume } from "../types";
import { Link } from "react-router-dom";
import {
    getId,
    presentAuthor,
    presentText,
    trimText,
} from "../../../utils/book/Format";

interface Props {
    item: Volume;
}

export const BookCard: VFC<Props> = memo((props) => {
    const history = useHistory();
    const { item } = props;

    return (
        <>
            <div className="flex bg-white border border-gray-200 rounded-lg shadow h-56 items-center">
                <div className="w-32">
                    <img
                        loading="lazy"
                        className="object-cover w-full rounded"
                        src={item.volumeInfo.imageLinks?.smallThumbnail}
                        alt=""
                    />
                </div>

                <div className="p-2 leading-normal w-3/5 h-full">
                    <h3 className="bold text-xl p-1 text-teal-500 hover:text-blue-500">
                        <Link to={`/book/${getId(item)}`}>
                            {trimText(item.volumeInfo.title, 50)}
                        </Link>
                    </h3>
                    <p>{presentAuthor(item.volumeInfo.authors)}</p>
                    <p>{presentText(item.volumeInfo.publishedDate)}</p>
                </div>
            </div>
        </>
    );
});