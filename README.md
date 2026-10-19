# PriceZen Frontend

Live site: [https://pricezen.in](https://pricezen.in)

PriceZen is a competitor price intelligence platform for e-commerce brands. It helps businesses track market pricing, identify revenue risks, and act on clear recommendations before customers switch to a cheaper alternative.

This repository contains the frontend application for the PriceZen platform. It is built with Next.js, React, TypeScript, and Tailwind CSS, and it powers the marketing website, pricing pages, trial flow, consent pages, payment flow, and admin dashboard experience.

---

## Project Overview

PriceZen automates the process of monitoring competitor prices across online stores and turning that data into useful business insights. Instead of manually checking prices every day, brands receive:

- real-time price tracking alerts
- product-level competitor comparisons
- estimated revenue impact in rupees
- weekly pricing recommendations
- monthly performance summaries
- a simple decision-making workflow without a complex dashboard

The goal is simple: help brands make faster pricing decisions and protect margins before competitors gain the upper hand.

---

## How It Works

1. A business signs up for the trial or pricing plan on the frontend.
2. The system captures the client and product details through the onboarding flow.
3. The backend monitors competitor websites and product listings using scraping logic and proxy rotation.
4. Price changes are compared against configured thresholds and product rules.
5. Alerts and reports are generated based on the collected pricing data.
6. Users receive email summaries with actionable recommendations, such as pricing adjustments or margin-saving opportunities.
7. Admin users can manage clients, activate subscriptions, and review product and payment information from the management portal.

In short, the frontend acts as the business-facing experience, while the backend automation handles monitoring, reports, and alert generation.

---

## Key Features

- responsive marketing website and landing page
- onboarding and trial signup flow
- legal consent and policy pages
- payment page integration for subscription management
- admin dashboard for client management
- pricing comparison and product intelligence pages
- clean modern UI designed for conversion and professional presentation

---

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React

---

## Project Structure

```bash
pricestats/
├── app/                 # App Router pages and API routes
├── components/          # Reusable UI components
├── hooks/               # Custom hooks
├── public/              # Static assets and public files
├── .env.local           # Local environment variables
├── .gitignore           # Git exclusions
├── eslint.config.mjs    # ESLint config
├── next.config.ts       # Next.js config
├── package.json         # Scripts and dependencies
├── postcss.config.js    # PostCSS setup
├── tsconfig.json        # TypeScript config
├── README.md            # Project documentation
└── ...
```

---

## Local Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the site in your browser:

```bash
http://localhost:3000
```

Build for production:

```bash
npm run build
```

Run linting:

```bash
npm run lint
```

---

## Environment Configuration

Create a local environment file for development settings:

```bash
cp .env.local.example .env.local
```

If the project requires backend or third-party service variables, add them to `.env.local` and keep them out of version control.

---

## Deployment

This frontend is designed to be deployed on a modern hosting platform such as Vercel. The app is optimized for fast page loads and a smooth user journey for trial signups, plan conversion, and product education.

---

## Notes

This repository focuses on the frontend presentation and user-facing product flow. The scraping, analytics, alerting, and subscription logic are handled by the backend and automation services in the broader PriceZen project.

---

## Contact

For questions or collaboration opportunities, visit the live product at [https://pricezen.in](https://pricezen.in).
