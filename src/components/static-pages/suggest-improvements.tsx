import React from "react";
import { Link } from "react-router-dom";

const SuggestImprovements: React.FC<any> = () => {
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
            <p className="title is-5">Suggest Improvements</p>
            <p className="subtitle is-6">work in progress..</p>
        </div>
    );
};

export default SuggestImprovements;
