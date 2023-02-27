import { BrowserRouter, Switch } from "react-router-dom";

// import { Index } from '../components/pages/Index'
// import { Detail } from '../components/pages/Detail'
// import { Page404 } from '../components/pages/Page404'
// import { UserLogin } from "../components/pages/UserLogin"
import { Home } from "../components/pages/Home";
import { Login } from "../components/pages/Login";
import Register from "../components/pages/Register";

import ProvideAuth, {
    PrivateRoute,
    PublicRoute,
} from "../providers/Auth/AuthProvider";

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

                    {/* <Route path="/" element={<Index />} />
          <Route path="/userlogin" element={<UserLogin />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/404" element={<Page404 />} /> */}
                </Switch>
            </BrowserRouter>
        </>
    );
};
