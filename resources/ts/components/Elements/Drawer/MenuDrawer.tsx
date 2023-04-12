import React, { memo, VFC } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import { Link } from "react-router-dom";

import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useAuth } from "../../../lib/Auth";
import axios from "axios";
import { useHistory } from "react-router-dom";

export const MenuDrawer: VFC = memo(() => {
    const [bookmarksChecked, setBookmarksChecked] = React.useState(true);
    const [urlsChecked, setUrlsChecked] = React.useState(false);
    const [person, setPerson] = React.useState("pedro");

    const history = useHistory();
    const auth = useAuth();

    const logout = () => {
        axios.get("/sanctum/csrf-cookie").then(() => {
            auth?.signout().then(() => {
                history.push("/login");
            });
        });
    };

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
                    {!auth.user && (
                        <DropdownMenu.Item className="text-base p-4 mx-4 md:ml-0 outline-none">
                            <Link to="/login">Login</Link>
                        </DropdownMenu.Item>
                    )}
                    {!auth.user && (
                        <DropdownMenu.Item className="text-base p-4 mx-4 md:ml-0 outline-none">
                            <Link to="/register">Register</Link>
                        </DropdownMenu.Item>
                    )}
                    {auth.user && (
                        <DropdownMenu.Item className="text-base p-4 mx-4 md:ml-0 outline-none">
                            <Link to="/mypage">Mypage</Link>
                        </DropdownMenu.Item>
                    )}
                    {auth.user && (
                        <DropdownMenu.Item className="text-base p-4 mx-4 md:ml-0 outline-none">
                            <Link to="/search">本を検索</Link>
                        </DropdownMenu.Item>
                    )}
                    {auth.user && (
                        <DropdownMenu.Item className="text-base p-4 mx-4 md:ml-0 outline-none">
                            <button onClick={logout}>logout</button>
                        </DropdownMenu.Item>
                    )}
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
});
