import React, { useEffect, useState } from "react";
import "./LandingPage.css";

interface Offer {
    id: string;
    itemNo: string;
    name: string;
    imageUrl: string;
    urls: { [countryCode: string]: { url: string } };
    prices: { [countryCode: string]: { currencyCode: string; price: number } };
    bestDiscount: number;
    bestValue: number;
    worstPrice: number;
    shopName?: string;
}

const LandingPage: React.FC = () => {
    const [offers, setOffers] = useState<Offer[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const [shop1Offers, setShop1Offers] = useState<Offer[]>([]);
    const [shop2Offers, setShop2Offers] = useState<Offer[]>([]);
    const [shop1Index, setShop1Index] = useState<number>(0);
    const [shop2Index, setShop2Index] = useState<number>(0);

    const [selectedCountry, setSelectedCountry] = useState<string>("pl");
    const [selectedOffersBy, setSelectedOffersBy] = useState<"byValue" | "byDiscount">("byValue");
    const [visibleShops, setVisibleShops] = useState<string[]>(["ikea", "ecco"]);

    const getCurrencyCode = (country: string): string => {
        switch (country) {
            case "pl":
                return "PLN";
            case "cz":
                return "CZK";
            default:
                return "PLN";
        }
    };

    const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newCountry = event.target.value;
        setSelectedCountry(newCountry);
        setLoading(true);

        fetch(`https://stores-api-polyu.ondigitalocean.app/api/offers/best.json`)
            .then((response) => response.json())
            .then(
                (data: {
                    [countryCode: string]: {
                        byValue: Offer[];
                        byDiscount: Offer[];
                    };
                }) => {
                    setOffers(data[newCountry][selectedOffersBy]);
                    setLoading(false);
                }
            )
            .catch((error) => {
                console.error("Error fetching offers:", error);
                setLoading(false);
            });

        const fetchPromises = [];
        for (const shop of visibleShops) {
            fetchPromises.push(
                fetch(`https://stores-api-polyu.ondigitalocean.app/api/offers/${shop}.json`)
                    .then((res) => res.json())
                    .then(
                        (data: {
                            [countryCode: string]: {
                                byValue: Offer[];
                                byDiscount: Offer[];
                            };
                        }) => {
                            if (shop === "ikea") setShop1Offers(data[newCountry][selectedOffersBy]);
                            else if (shop === "ecco") setShop2Offers(data[newCountry][selectedOffersBy]);
                        }
                    )
            );
        }
        Promise.all(fetchPromises).catch((error) => console.error("Error fetching shop offers:", error));
    };

    const handleOffersByChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newOffersBy = event.target.value as "byValue" | "byDiscount";
        setSelectedOffersBy(newOffersBy);
        setLoading(true);

        fetch(`https://stores-api-polyu.ondigitalocean.app/api/offers/best.json`)
            .then((response) => response.json())
            .then(
                (data: {
                    [countryCode: string]: {
                        byValue: Offer[];
                        byDiscount: Offer[];
                    };
                }) => {
                    setOffers(data[selectedCountry][newOffersBy]);
                    setLoading(false);
                }
            )
            .catch((error) => {
                console.error("Error fetching offers:", error);
                setLoading(false);
            });

        const fetchPromises = [];
        for (const shop of visibleShops) {
            fetchPromises.push(
                fetch(`https://stores-api-polyu.ondigitalocean.app/api/offers/${shop}.json`)
                    .then((res) => res.json())
                    .then(
                        (data: {
                            [countryCode: string]: {
                                byValue: Offer[];
                                byDiscount: Offer[];
                            };
                        }) => {
                            if (shop === "ikea") setShop1Offers(data[selectedCountry][newOffersBy]);
                            else if (shop === "ecco") setShop2Offers(data[selectedCountry][newOffersBy]);
                        }
                    )
            );
        }
        Promise.all(fetchPromises).catch((error) => console.error("Error fetching shop offers:", error));
    };

    const handleShopVisibilityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
        setVisibleShops(selectedOptions);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? offers.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === offers.length - 1 ? 0 : prevIndex + 1));
    };

    const handleShopPrev = (setIndex: React.Dispatch<React.SetStateAction<number>>, offers: Offer[]) => {
        setIndex((prevIndex) => (prevIndex === 0 ? offers.length - 1 : prevIndex - 1));
    };

    const handleShopNext = (setIndex: React.Dispatch<React.SetStateAction<number>>, offers: Offer[]) => {
        setIndex((prevIndex) => (prevIndex === offers.length - 1 ? 0 : prevIndex + 1));
    };

    useEffect(() => {
        fetch(`https://stores-api-polyu.ondigitalocean.app/api/offers/best.json`)
            .then((response) => response.json())
            .then(
                (data: {
                    [countryCode: string]: {
                        byValue: Offer[];
                        byDiscount: Offer[];
                    };
                }) => {
                    setOffers(data[selectedCountry][selectedOffersBy]);
                    setLoading(false);
                }
            )
            .catch((error) => {
                console.error("Error fetching offers:", error);
                setLoading(false);
            });

        const fetchPromises = [];
        for (const shop of visibleShops) {
            fetchPromises.push(
                fetch(`https://stores-api-polyu.ondigitalocean.app/api/offers/${shop}.json`)
                    .then((res) => res.json())
                    .then(
                        (data: {
                            [countryCode: string]: {
                                byValue: Offer[];
                                byDiscount: Offer[];
                            };
                        }) => {
                            if (shop === "ikea") setShop1Offers(data[selectedCountry][selectedOffersBy]);
                            else if (shop === "ecco") setShop2Offers(data[selectedCountry][selectedOffersBy]);
                        }
                    )
            );
        }
        Promise.all(fetchPromises).catch((error) => console.error("Error fetching shop offers:", error));
    }, [selectedCountry, visibleShops]);

    if (loading) {
        return <div>Loading...</div>;
    }

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
                            <div className="select is-multiple">
                                <select multiple value={visibleShops} onChange={handleShopVisibilityChange}>
                                    <option value="ikea" selected>
                                        ikea
                                    </option>
                                    <option value="ecco" selected>
                                        ecco
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div className="navbar-item">
                            <div className="control has-icons-left">
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
                        <div className="navbar-item">
                            <div className="control has-icons-left">
                                <div className="select">
                                    <select value={selectedCountry} onChange={handleCountryChange}>
                                        <option value="pl" selected>
                                            Poland
                                        </option>
                                        <option value="cz">Czechia</option>
                                    </select>
                                </div>
                                <span className="icon is-left">
                                    <i className="fas fa-globe"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <h1 className="title-main">Best Offers</h1>
            <div className="carousel">
                {offers.map((offer, index) => (
                    <a href={offer.urls[selectedCountry].url}>
                        <div key={offer.id} className="carousel-item" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                            <img src={offer.imageUrl} alt={`Offer ${offer.id}`} className="offer-image" />
                            <div className="offer-details">
                                <div className="discount-ribbon">-{(offer.bestDiscount * 100).toFixed(2)}%</div>
                                {offer.shopName && <div className="shop-ribbon">{offer.shopName}</div>}
                                <p className="price-tag">
                                    <span className="original-price">
                                        {offer.worstPrice.toFixed(2)} {getCurrencyCode(selectedCountry)}
                                    </span>{" "}
                                    {offer.prices[selectedCountry].price.toFixed(2)} {getCurrencyCode(selectedCountry)}
                                </p>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
            <div className="carousel-controls">
                <button className="prev-button" onClick={() => handlePrev()}>
                    &#8592;
                </button>
                <button className="next-button" onClick={() => handleNext()}>
                    &#8594;
                </button>
            </div>
            <>
                <h2 className="title-section">ikea Offers</h2>
                <div className="carousel">
                    {shop1Offers.map((offer, index) => (
                        <a href={offer.urls[selectedCountry].url}>
                            <div key={offer.id} className="carousel-item" style={{ transform: `translateX(-${shop1Index * 100}%)` }}>
                                <img src={offer.imageUrl} alt={`ikea Offer ${offer.id}`} className="offer-image" />
                                <div className="offer-details">
                                    <div className="discount-ribbon">-{(offer.bestDiscount * 100).toFixed(2)}%</div>
                                    <p className="price-tag">
                                        <span className="original-price">
                                            {offer.worstPrice.toFixed(2)} {getCurrencyCode(selectedCountry)}
                                        </span>{" "}
                                        {offer.prices[selectedCountry].price.toFixed(2)} {getCurrencyCode(selectedCountry)}
                                    </p>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
                <div className="carousel-controls">
                    <button className="prev-button" onClick={() => handleShopPrev(setShop1Index, shop1Offers)}>
                        &#8592;
                    </button>
                    <button className="next-button" onClick={() => handleShopNext(setShop1Index, shop1Offers)}>
                        &#8594;
                    </button>
                </div>
            </>
            <>
                <h2 className="title-section">ecco Offers</h2>
                <div className="carousel">
                    {shop2Offers.map((offer, index) => (
                        <a href={offer.urls[selectedCountry].url}>
                            <div key={offer.id} className="carousel-item" style={{ transform: `translateX(-${shop2Index * 100}%)` }}>
                                <img src={offer.imageUrl} alt={`ecco Offer ${offer.id}`} className="offer-image" />
                                <div className="offer-details">
                                    <div className="discount-ribbon">-{(offer.bestDiscount * 100).toFixed(2)}%</div>
                                    <p className="price-tag">
                                        <span className="original-price">
                                            {offer.worstPrice.toFixed(2)} {getCurrencyCode(selectedCountry)}
                                        </span>{" "}
                                        {offer.prices[selectedCountry].price.toFixed(2)} {getCurrencyCode(selectedCountry)}
                                    </p>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
                <div className="carousel-controls">
                    <button className="prev-button" onClick={() => handleShopPrev(setShop2Index, shop2Offers)}>
                        &#8592;
                    </button>
                    <button className="next-button" onClick={() => handleShopNext(setShop2Index, shop2Offers)}>
                        &#8594;
                    </button>
                </div>
            </>
        </div>
    );
};

export default LandingPage;
