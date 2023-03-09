import React, { memo, ReactNode, VFC } from "react";


type Props = {
    children: ReactNode;
};

import { MenuDrawer } from "../Elements";

import { CodeSandboxLogoIcon } from "@radix-ui/react-icons";

const Header: VFC = memo(() => {

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


export const DefaultLayout: VFC<Props> = memo((props) => {
    const { children } = props;
    return (
        <>
            <Header />
            {children}
        </>
    );
});
