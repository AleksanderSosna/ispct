import React, { useEffect, useState } from "react";

import OffersPage from "../offers-page/OffersPage";

const LandingPage: React.FC = () => {
    const [selectedCountry, setSelectedCountry] = useState<string>("pl");
    const [selectedCurrency, setSelectedCurrency] = useState<string>("PLN");
    const [selectedOffersBy, setSelectedOffersBy] = useState<"byValue" | "byDiscount">("byValue");

    const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCountry(event.target.value);
    };

    const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCurrency(event.target.value);
    };

    const handleOffersByChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOffersBy(event.target.value as "byValue" | "byDiscount");
    };

    return (
        <div>
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href="/">
                        <strong>ISPCT Page</strong>
                    </a>
                </div>
                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <a className="navbar-item">Home</a>
                        <a className="navbar-item">About</a>
                        <a className="navbar-item">Suggest Improvements</a>
                    </div>
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="control">
                                <div className="select">
                                    <select value={selectedCountry} onChange={handleCountryChange}>
                                        <option value="pl" selected>
                                            Poland
                                        </option>
                                        <option value="cz">Czechia</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="navbar-item">
                            <div className="control">
                                <div className="select">
                                    <select value={selectedCurrency} onChange={handleCurrencyChange}>
                                        <option value="PLN" selected>
                                            PLN
                                        </option>
                                        <option value="CZK">CZK</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="navbar-item">
                            <div className="control">
                                <div className="select">
                                    <select value={selectedOffersBy} onChange={handleOffersByChange}>
                                        <option value="byValue" selected>
                                            by value
                                        </option>
                                        <option value="byDiscount">by discount</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            {["best", "ikea", "ecco"].map((shop) => (
                <OffersPage shop={shop} selectedCountry={selectedCountry} selectedCurrency={selectedCurrency} selectedOffersBy={selectedOffersBy} />
            ))}
        </div>
    );
};

export default LandingPage;
