import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import LandingPage from "../components/landing-page/LandingPage";
import About from "src/components/static-pages/about";
import ContactUs from "src/components/static-pages/contact-us";
import SuggestImprovements from "src/components/static-pages/suggest-improvements";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <Router>
            <div id="main">
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/offer/:shop/:productId" element={<LandingPage showOffer={true} />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/suggest-improvements" element={<SuggestImprovements />} />
                    <Route path="/contact-us" element={<ContactUs />} />
                </Routes>
            </div>
        </Router>
    </React.StrictMode>
);
