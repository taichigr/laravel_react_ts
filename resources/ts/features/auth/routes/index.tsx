import { Login } from "../../../pages/auth/Login";
import Register from "../../../pages/auth/Register";

type authRoute = {
    path: string;
    authenticate: "private" | "onlyGuest";
    exact: boolean;
    children: JSX.Element;
};

export const authRoutes: authRoute[] = [
    {
        path: "/login",
        authenticate: "onlyGuest",
        exact: false,
        children: <Login />,
    },
    {
        path: "/register",
        authenticate: "onlyGuest",
        exact: false,
        children: <Register />,
    },
];
