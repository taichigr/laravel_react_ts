import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Page404 } from "../pages/Page404";
import { Mypage } from "../pages/Mypage";

import { OnlyGuestRoute, PrivateRoute } from "../lib/Auth";
import { authRoutes } from "../features/auth/routes";
import { DefaultLayout } from "../components/Layout/DefaultLayout";
import { SearchBooks } from "../pages/SearchBooks";
import { BookDetail } from "../pages/book/BookDetail";
import { BookReviewForm } from "../pages/book/BookReviewForm";
import { EditProfile } from "../pages/auth/EditProfile";
import { Profile } from "../pages/auth/Profile";

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
                    {/* プロフィール確認ページ */}
                    <PrivateRoute path="/profile" exact>
                        <DefaultLayout>
                            <Profile />
                        </DefaultLayout>
                    </PrivateRoute>

                    {/* プロフィール編集ページ */}
                    <PrivateRoute path="/profile/edit" exact>
                        <DefaultLayout>
                            <EditProfile />
                        </DefaultLayout>
                    </PrivateRoute>
                    <Route path="/search" exact="true">
                        <DefaultLayout>
                            <SearchBooks />
                        </DefaultLayout>
                    </Route>


                    {/* book review */}
                    {/* :idはリファクタリング必須 */}
                    <PrivateRoute path="/book/review/:id" exact>
                        <DefaultLayout>
                            <BookReviewForm />
                        </DefaultLayout>
                    </PrivateRoute>

                    {/* book詳細 */}
                    <Route path="/book/:googleBooksId" exact="true">
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
