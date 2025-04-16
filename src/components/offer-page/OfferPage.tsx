import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Product {
    id: string;
    itemNo: string;
    name: string;
    imageUrl: string;
    urls: { [countryCode: string]: { url: string } };
    prices: { [countryCode: string]: { [currencyCode: string]: number } };
}

const OfferPage: React.FC<{
    shop: string;
    productId: string;
    selectedCountry: string;
    selectedCurrency: string;
    selectedOffersBy: string;
}> = ({ shop, productId, selectedCountry, selectedCurrency }) => {
    const [offer, setOffer] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch specific offer data
        fetch(`https://stores-api-polyu.ondigitalocean.app/api/${shop}/products/${productId}.json`)
            .then((response) => response.json())
            .then((data) => {
                setOffer(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching offer:", error);
                setLoading(false);
            });
    }, [productId]);

    if (loading) return <div>Loading...</div>;
    if (!offer) return <div>Offer not found</div>;

    return (
        <div className="container">
            <Link to="/">
                <button className="button is-light">
                    <span className="icon-text">
                        <span className="material-icons"> arrow_back </span>
                    </span>
                    <span>Back to offers</span>
                </button>
            </Link>
            <div className="columns">
                <div className="column is-half">
                    <figure className="image">
                        <img src={offer.imageUrl} alt={offer.name} />
                    </figure>
                </div>
                <div className="column">
                    <h1 className="title">{offer.name}</h1>
                    <h2 className="subtitle">Item #{offer.itemNo}</h2>
                    <div className="content">
                        <p className="title is-4 has-text-success">
                            {offer.prices[selectedCountry][selectedCurrency].toFixed(0)} {selectedCurrency}
                        </p>
                        <a href={offer.urls[selectedCountry].url}>
                            <button className="button is-primary">
                                <span className="icon-text">
                                    <span className="material-icons"> open_in_new </span>
                                </span>
                                <span>Visit Store</span>
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OfferPage;
