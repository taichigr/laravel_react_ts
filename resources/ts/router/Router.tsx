import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Page404 } from "../components/pages/Page404";
import { Home } from "../components/pages/Home";
import { Login } from "../components/pages/Login";
import Register from "../components/pages/Register";

import { PrivateRoute, PublicRoute } from "../providers/Auth/AuthProvider";

export const Router = () => {
    return (
        <>
            <BrowserRouter>
                <Switch>
                    <PrivateRoute path="/mypage">
                        <Home />
                    </PrivateRoute>
                    <PublicRoute path="/login">
                        <Login />
                    </PublicRoute>
                    <PublicRoute path="/register">
                        <Register />
                    </PublicRoute>
                    <Route path="*">
                        <Page404 />
                    </Route>
                </Switch>
            </BrowserRouter>
        </>
    );
};
