import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Page404 } from "../pages/Page404";
import { Home } from "../pages/Home";

import { OnlyGuestRoute, PrivateRoute } from "../lib/AuthProvider";
import { authRoutes } from "../features/auth/routes";
import { DefaultLayout } from "../components/Layout/DefaultLayout";

export const Router = () => {
    return (
        <>
            <BrowserRouter>
                <Switch>
                    {authRoutes.map((route, index) => {
                        const { path, authenticate, exact, children } = route;
                        if (authenticate == "onlyGuest") {
                            return (
                                <OnlyGuestRoute
                                    path={path}
                                    exact={exact}
                                    key={index}
                                >
                                    <DefaultLayout>{children}</DefaultLayout>
                                </OnlyGuestRoute>
                            );
                        }
                        if (authenticate == "private") {
                            return (
                                <PrivateRoute path={path} exact={exact}>
                                    {children}
                                </PrivateRoute>
                            );
                        }
                    })}

                    <PrivateRoute path="/mypage">
                        <DefaultLayout>
                            <Home />
                        </DefaultLayout>
                    </PrivateRoute>
                    <Route path="*">
                        <Page404 />
                    </Route>
                </Switch>
            </BrowserRouter>
        </>
    );
};
