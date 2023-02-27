import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import ProvideAuth, {
    PrivateRoute,
    PublicRoute,
} from "./providers/Auth/AuthProvider";
import { Router } from "./router/Router";

const App = () => {
    // 編集
    return (
        <ProvideAuth>
            <Router />
        </ProvideAuth>
    );
};

ReactDOM.render(<App />, document.getElementById("app"));
