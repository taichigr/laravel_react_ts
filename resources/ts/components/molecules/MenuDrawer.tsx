import React, { memo, VFC } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import { Link } from "react-router-dom";

import {
    HamburgerMenuIcon,
    Cross1Icon,
    DotFilledIcon,
    CheckIcon,
    ChevronRightIcon,
} from "@radix-ui/react-icons";

export const MenuDrawer:VFC = memo(() => {
    const [bookmarksChecked, setBookmarksChecked] = React.useState(true);
    const [urlsChecked, setUrlsChecked] = React.useState(false);
    const [person, setPerson] = React.useState("pedro");

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <button
                    className="text-white h-4 w-4 text-base"
                    aria-label="Customise options"
                >
                    <HamburgerMenuIcon />
                </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    className="bg-teal-400 text-white p-4 rounded bg-opacity-80"
                    sideOffset={10}
                    alignOffset={10}
                >

                    <DropdownMenu.Item className="text-base p-4 mx-4 md:ml-0 outline-none">
                        <Link to="/login">Login</Link>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className="text-base p-4 mx-4 md:ml-0 outline-none">
                        <Link to="/register">Register</Link>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className="text-base p-4 mx-4 md:ml-0 outline-none">
                        <Link to="/mypage">Mypage</Link>
                    </DropdownMenu.Item>

                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
});
