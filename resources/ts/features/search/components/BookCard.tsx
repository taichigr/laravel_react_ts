import React, { memo, useState, VFC } from "react";
import { useHistory } from "react-router-dom";
import { Volume } from "../types";

interface Props {
    item: Volume;
}

export const BookCard: VFC<Props> = memo((props) => {
    const history = useHistory();
    const { item } = props;

    const trimText = (text, maxLength) => {
        if (!text) {
            return "";
        }
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + "...";
        } else {
            return text;
        }
    };

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
                    <h5 className="">{item.volumeInfo.title}</h5>
                    <p className="font-normal">
                        {trimText(item.volumeInfo.description, 70) ?? ""}
                    </p>
                </div>
            </div>
        </>
    );
});
