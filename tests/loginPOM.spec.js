const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');

// Part B - positive and negative login tests, both driven through LoginPage.
// The spec never touches a raw locator; everything goes through the page object.
test('POM positive - standard_user signs in successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  await expect(page).toHaveURL(/inventory/);
});

test('POM negative - empty credentials are rejected', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('', '');

  await expect(loginPage.error).toBeVisible();
});
