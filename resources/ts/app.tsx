import "../css/app.css";
import React from "react";
import { createRoot } from 'react-dom/client';

const App = () => {
    return <h1 className="text-red-400 text-4xl"></h1>;
};
const container = document.getElementById('app') as HTMLInputElement;
const root = createRoot(container);
root.render(<App />);