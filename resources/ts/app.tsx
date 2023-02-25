import "../css/app.css";
import React from "react";
import { createRoot } from 'react-dom/client';
import { Router } from "./router/Router";
import ProvideAuth from "./providers/Auth/AuthProvider";

// import {BrowserRouter, Route, Switch} from 'react-router-dom'


const App = () => {
    return (
        <>
          <ProvideAuth>
              <Router />
          </ProvideAuth>
        </>
    );
};
const container = document.getElementById('app') as HTMLInputElement;
const root = createRoot(container);
root.render(<App />);