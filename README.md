# International Store Prices Comparison Tool

A React-based web application for exploring and comparing product offers across international IKEA, ECCO, C&A, and Deichmann stores.

**Live website:** [stores-api-polyu.ondigitalocean.app](https://stores-api-polyu.ondigitalocean.app/)

## Overview

ISPCT helps shoppers compare product prices, discounts, and store availability across supported countries and currencies. The interface retrieves offer data from a public JSON API and presents it in a responsive store-by-store catalogue.

## Features

- Browse current offers from **IKEA**, **ECCO**, **C&A**, and **Deichmann**
- Compare offers from **Poland** and **Czechia**
- Switch between **PLN** and **CZK**
- Sort products by:
  - Best value
  - Percentage discount
- Open a dedicated product page with the offer image, item number, local price, and original store link
- Navigate between stores and products using hash-based routes
- Responsive layouts built with Bulma and Material Icons

## Tech Stack

| Category | Technology |
| --- | --- |
| UI | React 19, TypeScript |
| Routing | React Router 7 |
| Styling | Bulma 1.0, Material Icons |
| Build tools | Create React App, react-app-rewired, webpack |
| Data | REST-style JSON API |
| Deployment | DigitalOcean App Platform |

## How It Works

The landing page presents the available stores. When a store is selected, the application fetches its offer catalogue and filters the returned data using the selected country, currency, and sorting preference.

```text
src/
├── components/
│   ├── landing-page/       Store selection and navigation
│   ├── offers-list/        Offer catalogue and sorting
│   ├── offer-page/         Individual product details
│   └── static-pages/       About, contact, and feedback pages
└── main/
    └── index.tsx           Application routes
```

## API

The application uses this public API:

```text
https://stores-api-polyu.ondigitalocean.app/
```

Example catalogue endpoints:

```text
/api/offers/ikea.json
/api/offers/ecco.json
/api/offers/c-and-a.json
/api/offers/deichmann.json
```

Example product endpoint:

```text
/api/{shop}/products/{productId}.json
```

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

```bash
git clone https://github.com/AleksanderSosna/ispct.git
cd ispct
npm install
```

### Development

```bash
npm start
```

The development server will open at `http://localhost:3000`.

### Production Build

```bash
npm run build
```

The optimized build is generated in the `build/` directory.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm start` | Start the development server |
| `npm run build` | Create a production build |
| `npm run lint:check` | Run ESLint and TypeScript checks |
| `npm run lint:fix` | Format code, run ESLint fixes, and check types |

## Roadmap

- Complete the pages fron NavBar
- Add more stores and countries
- Add an application screenshot and expanded API documentation

## Author

**Aleksander Sosna**

- GitHub: [@AleksanderSosna](https://github.com/AleksanderSosna)

## License

This repository currently declares `UNLICENSED` in `package.json`. All rights are reserved unless an explicit license is added.
