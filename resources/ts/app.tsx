import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import {AuthProvider} from "./lib/AuthProvider";
import { Router } from "./routes/Router";

const App = () => {
    // 編集
    return (
        <AuthProvider>
            <Router />
        </AuthProvider>
    );
};

ReactDOM.render(<App />, document.getElementById("app"));
