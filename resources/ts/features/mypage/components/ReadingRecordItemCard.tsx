import React, { VFC } from "react";
import { Link } from "react-router-dom";
import { ReadingRecord } from "../types";
import { trimText } from "../../../utils/book/Format";

type Props = {
  record: ReadingRecord;
};

export const ReadingRecordItemCard: VFC<Props> = ({ record }) => {
  return (
    <div className="flex bg-white border border-gray-200 rounded-lg shadow h-56 items-center">
      <div className="w-32">
        <img
          loading="lazy"
          className="object-cover w-full rounded"
          src={record.book.image_url}
          alt=""
        />
      </div>

      <div className="p-2 leading-normal w-3/5 h-full">
        <h3 className="bold text-xl p-1 text-teal-500 hover:text-blue-500">
          <Link to={`/book/${record.book.google_book_id}`}>
            {trimText(record.book.title, 50)}
          </Link>
        </h3>
        <p>{record.book.author}</p>
        <p>{record.book.publisher}</p>
        <p>{record.status}</p>
      </div>
    </div>
  );
};
