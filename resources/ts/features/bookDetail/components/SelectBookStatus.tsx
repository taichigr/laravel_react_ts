import React, { memo, useEffect } from "react";
import { useSelectBookStatus } from "../hooks/useSelectBookStatus";

interface Props {
  bookId: string;
  title: string;
  author: string;
  publisher: string;
  imageUrl: string;
  defaultStatus: string;
}

export const SelectBookStatus = memo(
  ({ bookId, title, author, publisher, imageUrl, defaultStatus }: Props) => {
    const { selectedValue, handleChange } = useSelectBookStatus({
      bookId,
      title,
      author,
      publisher,
      imageUrl,
    });

    return (
      <div>
        <select value={selectedValue || defaultStatus} onChange={handleChange}>
          <option value="to_read">読みたい</option>
          <option value="reading">読んでいる途中</option>
          <option value="finished">読み終わった</option>
          <option value="unread">積読</option>
        </select>
      </div>
    );
  }
);
