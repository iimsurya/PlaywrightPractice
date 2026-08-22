# Playwright Practice

This repository contains Playwright automation practice tests for e-commerce and form interactions using Rahul Shetty Academy demo pages.

## Tech Stack

- Playwright
- JavaScript
- Node.js
- HTML report generation

## Project Structure

```bash
.
├── .github/
├── .gitignore
├── README.md
├── package.json
├── package-lock.json
├── playwright.config.ts
├── test-results/
├── playwright-report/
├── testScreenshots/
├── tests/
│   ├── Ecomm.spec.js
│   ├── EcommerceApp.spec.js
│   └── ProtoCommerce.spec.js
└── node_modules/
```

## Included Practice Scenarios

- Product browsing and cart flow
- Form validation and input handling
- Checkout flow automation
- Dropdowns, radio buttons, checkboxes, and selectors
- Screenshot capture during test execution

## Prerequisites

- Node.js 18+
- npm

## Installation

```bash
npm install
```

## Running Tests

Run all tests:

```bash
npx playwright test
```

Run a specific file:

```bash
npx playwright test tests/ProtoCommerce.spec.js
```

Run in headed mode:

```bash
npx playwright test --headed
```

Open the HTML report:

```bash
npx playwright show-report
```

## Browser Configuration

The project is configured in `playwright.config.ts` to use Chromium with `headless: false` for local visual debugging.

## Notes

- Generated test artifacts such as `test-results/`, `playwright-report/`, and screenshots under `testScreenshots/` are ignored by Git via `.gitignore`.
- These tests use public demo websites for learning and practice.

## Useful Git Commands

```bash
git status
git add .
git commit -m "Add Playwright practice tests"
git push origin main
```

