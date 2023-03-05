import React, { memo, VFC } from "react";

import { MenuDrawer } from "../../molecules/MenuDrawer";

import { CodeSandboxLogoIcon } from "@radix-ui/react-icons";

export const Header: VFC = memo(() => {

    return (
        <>
            <header className="flex justify-between px-4 py-6 mx-auto bg-teal-400">
                <div>
                    <CodeSandboxLogoIcon />
                </div>
                <MenuDrawer />
            </header>
        </>
    );
});
