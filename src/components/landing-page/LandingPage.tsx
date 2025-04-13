import React, { useEffect, useState } from "react";

import OffersPage from "../offers-page/OffersPage";

const LandingPage: React.FC = () => {
    const [selectedCountry, setSelectedCountry] = useState<string>("pl");
    const [selectedCurrency, setSelectedCurrency] = useState<string>("PLN");
    const [selectedOffersBy, setSelectedOffersBy] = useState<"byValue" | "byDiscount">("byValue");
    const [isActive, setIsActive] = useState(false);

    const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCountry(event.target.value);
    };

    const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCurrency(event.target.value);
    };

    const handleOffersByChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOffersBy(event.target.value as "byValue" | "byDiscount");
    };

    const toggleBurger = () => {
        setIsActive(!isActive);
    };

    return (
        <div>
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href="/">
                        <strong>ISPCT Page</strong>
                    </a>
                    <a
                        role="button"
                        className={`navbar-burger ${isActive ? "is-active" : ""}`}
                        aria-label="menu"
                        aria-expanded={isActive}
                        data-target="navbar"
                        onClick={toggleBurger}
                    >
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
                <div id="navbar" className={`navbar-menu ${isActive ? "is-active" : ""}`}>
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
                                            best value
                                        </option>
                                        <option value="byDiscount">% discount</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            {["ikea", "ecco"].map((shop) => (
                <OffersPage shop={shop} selectedCountry={selectedCountry} selectedCurrency={selectedCurrency} selectedOffersBy={selectedOffersBy} />
            ))}
        </div>
    );
};

export default LandingPage;
