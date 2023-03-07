import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import ProvideAuth from "./providers/Auth/AuthProvider";
import { Router } from "./routes/Router";

const App = () => {
    // 編集
    return (
        <ProvideAuth>
            <Router />
        </ProvideAuth>
    );
};

ReactDOM.render(<App />, document.getElementById("app"));
