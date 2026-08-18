# Playwright Practice

This repository contains browser automation practice tests built with Playwright. The project focuses on end-to-end UI validation for e-commerce and form automation scenarios using Rahul Shetty Academy demo sites.

## Tech Stack

- Playwright
- JavaScript
- Node.js

## Project Structure

```bash
.
├── tests/
│   ├── Practice.spec.js
│   ├── Ecomm.spec.js
│   └── EcommerceAug.spec.js
├── playwright.config.ts
├── package.json
├── package-lock.json
├── screenshot.png
├── screenshotProduct.png
├── checkoutPage.png
├── element.png
└── README.md
```

## Features Covered

- Login flow validation
- Product search and cart flow
- Checkout process automation
- Form interaction and dropdown practice
- Screenshot capture for visual validation

## Prerequisites

- Node.js 18 or newer
- npm

## Installation

```bash
npm install
```

## Running Tests

Run all Playwright tests:

```bash
npx playwright test
```

Run a specific spec file:

```bash
npx playwright test tests/Practice.spec.js
```

Open the Playwright HTML report:

```bash
npx playwright show-report
```

## Notes

- The project is configured to run Chromium in headed mode by default in `playwright.config.ts`.
- The tests use public demo websites for learning and practice.
- Generated screenshots and Playwright reports are stored in the project root and `playwright-report/`.

## GitHub Upload

To upload this project to GitHub:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-repository-url>
git push -u origin main
```
