# Software Quality Engineering - Playwright Assignment

**Name:** Adil Khan
**Student ID:** SE231076
**Tested application:** https://www.saucedemo.com

This repository contains Playwright UI automation for the Saucedemo web store.
Part A automates the main user journeys; Part B introduces a `LoginPage` Page
Object and drives the login tests through it.

## Folder layout

| Path | Purpose |
|------|---------|
| `pages/LoginPage.js` | Page Object with `goto()` and `login()` |
| `tests/partA.spec.js` | Part A - six automation-basics tests |
| `tests/loginPOM.spec.js` | Part B - positive & negative POM login tests |
| `playwright.config.js` | Playwright configuration |

## Running the tests

```bash
npm install
npx playwright install
npx playwright test
```

To open the interactive Playwright UI runner:

```bash
npx playwright test --ui
```
