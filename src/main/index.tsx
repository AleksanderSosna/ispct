import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import LandingPage from "../components/landing-page/LandingPage";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <Router>
            <div id="main">
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                </Routes>
            </div>
        </Router>
    </React.StrictMode>
);
