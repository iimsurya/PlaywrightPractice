# Playwright Practice

Playwright end-to-end and API testing examples written in JavaScript. The tests exercise public Rahul Shetty Academy demo applications and cover browser interactions, e-commerce workflows, and API-assisted UI testing.

## Requirements

- Node.js (LTS recommended)
- npm
- A Chromium browser installed through Playwright

## Setup

Install the project dependencies and Chromium:

```bash
npm install
npx playwright install chromium
```

## Running tests

Run the complete suite:

```bash
npx playwright test
```

Run a specific test file:

```bash
npx playwright test tests/ProtoCommerce.spec.js
```

Run tests whose titles match a pattern:

```bash
npx playwright test --grep "Shopping Application"
```

Run with a visible browser:

```bash
npx playwright test --headed
```

Open the Playwright test UI:

```bash
npx playwright test --ui
```

The configuration is in `playwright.config.ts`. It discovers tests in `tests/`, uses the Chromium project, runs browsers headed by default, and produces an HTML report.

## Practice scenarios

| File | Coverage |
| --- | --- |
| `tests/Ecomm.spec.js` | E-commerce cart: add a product and remove it |
| `tests/EcommerceApp.spec.js` | Product search, checkout, order confirmation, order details, and deletion |
| `tests/EcommAPI.spec.js` | Create an order through the API, then inspect it in the browser |
| `tests/APIUtils.js` | Shared API helper for login and order creation |
| `tests/ProtoCommerce.spec.js` | Form controls, validation, and product selection |
| `tests/FrameAlertHover.spec.js` | Dialogs, hover interactions, and iframe content |
| `tests/EventHub.spec.js` | Account registration, event creation, booking, and cancellation |

Some scenarios rely on state in the remote demo applications, so availability and test data can affect results. Tests that use `test.only` run exclusively during local execution; remove those modifiers to run the full suite. CI is configured to reject focused tests.

## Reports and artifacts

After a run, open the HTML report with:

```bash
npx playwright show-report
```

Playwright's HTML report and test results are written to `playwright-report/` and `test-results/`. Screenshots explicitly saved by tests go to `testScreenshots/`. These generated directories are ignored by Git.

## Continuous integration

The GitHub Actions workflow in `.github/workflows/playwright.yml` installs dependencies and browser binaries, runs the Playwright suite on pushes and pull requests to `main` or `master`, and uploads the HTML report.
