const { test, expect } = require('@playwright/test');

const APP = 'https://www.saucedemo.com/';

// Helper: log in once and reuse it across the tests that need an authenticated
// session, so each test can focus on the behaviour it is actually checking.
async function signIn(page, user = 'standard_user', pass = 'secret_sauce') {
  await page.goto(APP);
  await page.locator('#user-name').fill(user);
  await page.locator('#password').fill(pass);
  await page.locator('#login-button').click();
}

test('valid login opens the products page', async ({ page }) => {
  await signIn(page);

  await expect(page).toHaveURL(/inventory/);
  await expect(page.locator('.title')).toHaveText('Products');
});

test('wrong password is rejected with an error', async ({ page }) => {
  await page.goto(APP);
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('bad_secret');
  await page.locator('#login-button').click();

  await expect(page.locator('[data-test="error"]')).toBeVisible();
});

test('cart badge shows 2 after adding two products', async ({ page }) => {
  await signIn(page);

  await page.locator('#add-to-cart-sauce-labs-bike-light').click();
  await page.locator('#add-to-cart-sauce-labs-onesie').click();

  await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
});

test('checkout completes and shows the thank-you message', async ({ page }) => {
  await signIn(page);

  await page.locator('#add-to-cart-sauce-labs-bike-light').click();
  await page.locator('.shopping_cart_link').click();
  await page.locator('#checkout').click();

  await page.locator('#first-name').fill('Adil');
  await page.locator('#last-name').fill('Khan');
  await page.locator('#postal-code').fill('74000');
  await page.locator('#continue').click();
  await page.locator('#finish').click();

  await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
});

test('user can log out from the burger menu', async ({ page }) => {
  await signIn(page);

  await page.locator('#react-burger-menu-btn').click();
  await page.locator('#logout_sidebar_link').click();

  await expect(page).toHaveURL(APP);
  await expect(page.locator('#login-button')).toBeVisible();
});

test('products sort from low to high price', async ({ page }) => {
  await signIn(page);

  await page.locator('.product_sort_container').selectOption('lohi');

  const texts = await page.locator('.inventory_item_price').allTextContents();
  const prices = texts.map((t) => Number(t.replace('$', '')));

  expect(prices[0]).toBeLessThan(prices[prices.length - 1]);
});
