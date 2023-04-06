import React, { VFC } from "react";
import { PersonIcon } from "@radix-ui/react-icons";

type Props = {
  name: string;
};

export const UserProfile: VFC<Props> = ({ name }) => {
  return (
    <div className="p-2 bg-white border border-gray-200 rounded-lg shadow h-36">
      <div className="flex items-center">
        <div className="bg-gray-300 p-2 rounded-full text-white">
          <PersonIcon />
        </div>
        <div className="ml-2">
          <p>{name}</p>
        </div>
      </div>
    </div>
  );
};
