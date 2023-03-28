import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Page404 } from "../pages/Page404";
import { Mypage } from "../pages/Mypage";

import { OnlyGuestRoute, PrivateRoute } from "../lib/Auth";
import { authRoutes } from "../features/auth/routes";
import { DefaultLayout } from "../components/Layout/DefaultLayout";
import { SearchBooks } from "../pages/SearchBooks";
import { BookDetail } from "../pages/book/BookDetail";

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
                                    <DefaultLayout>{children}</DefaultLayout>
                                </PrivateRoute>
                            );
                        }
                    })}

                    <PrivateRoute path="/mypage">
                        <DefaultLayout>
                            <Mypage />
                        </DefaultLayout>
                    </PrivateRoute>
                    <Route path="/search" exact="true">
                        <DefaultLayout>
                            <SearchBooks />
                        </DefaultLayout>
                    </Route>
                    <Route path="/book/:id" exact="true">
                        <DefaultLayout>
                            <BookDetail />
                        </DefaultLayout>
                    </Route>
                    <Route path="*">
                        <Page404 />
                    </Route>
                </Switch>
            </BrowserRouter>
        </>
    );
};
