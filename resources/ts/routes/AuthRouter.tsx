import { Login } from "../components/pages/Login";
import Register from "../components/pages/Register";

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
