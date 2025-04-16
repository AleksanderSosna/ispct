import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Offer {
    id: string;
    itemNo: string;
    name: string;
    imageUrl: string;
    urls: { [countryCode: string]: { url: string } };
    prices: { [countryCode: string]: { [currencyCode: string]: number } };
    bestDiscount: number;
    bestValue: { [currencyCode: string]: number };
    worstPrice: { [currencyCode: string]: number };
}

const OffersList: React.FC<{ shop: string; selectedCountry: string; selectedCurrency: string; selectedOffersBy: string }> = ({
    shop,
    selectedCountry,
    selectedCurrency,
    selectedOffersBy,
}) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [offers, setOffers] = useState<Offer[]>([]);

    useEffect(() => {
        fetch(`https://stores-api-polyu.ondigitalocean.app/api/offers/${shop}.json`)
            .then((response) => response.json())
            .then((data) => {
                setOffers(data[selectedCountry][selectedOffersBy]);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching offers:", error);
                setLoading(false);
            });
    }, [selectedCountry, selectedOffersBy]);

    if (loading) {
        return (
            <>
                <h1 className="title is-1">{shop.charAt(0).toUpperCase() + shop.slice(1)}</h1>
                <h2 className="subtitle">Loading...</h2>
            </>
        );
    }

    if (offers.length === 0) {
        return (
            <>
                <h1 className="title is-1">{shop.charAt(0).toUpperCase() + shop.slice(1)}</h1>
                <h2 className="subtitle">no {shop.charAt(0).toUpperCase() + shop.slice(1)} offers at the time, sorry...</h2>
            </>
        );
    }

    return (
        <>
            <h1 className="title is-1">{shop.charAt(0).toUpperCase() + shop.slice(1)}</h1>
            <div className="grid">
                {offers.map((offer, index) => (
                    <div className="cell">
                        <div className="card">
                            <Link to={`/offer/${shop}/${offer.id}`}>
                                <header className="card-header">
                                    <p className="card-header-title is-clipped">{offer.name}</p>
                                </header>
                                <div className="card-image">
                                    <figure className="image is-4by3">
                                        <img src={offer.imageUrl} alt={`offer ${offer.id}`} />
                                    </figure>
                                    <div className="is-overlay" style={{ top: "auto", padding: "0.5rem" }}>
                                        <span className="tag is-danger">-{(offer.bestDiscount * 100).toFixed(0)}%</span>
                                    </div>
                                </div>
                            </Link>
                            <div className="card-content">
                                <div className="content">
                                    <p className="title is-5 has-text-success">
                                        {offer.prices[selectedCountry][selectedCurrency].toFixed(0)} {selectedCurrency}
                                    </p>
                                    <p className="subtitle is-6 has-text-grey-light">
                                        <s>
                                            {offer.worstPrice[selectedCurrency].toFixed(0)} {selectedCurrency}
                                        </s>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default OffersList;
