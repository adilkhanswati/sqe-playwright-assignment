// LoginPage - Page Object Model for saucedemo.com.
// All selectors are grouped here so the spec files never reference raw locators.
const BASE_URL = 'https://www.saucedemo.com/';

class LoginPage {
  constructor(page) {
    this.page = page;
    this.selectors = {
      username: '#user-name',
      password: '#password',
      submit: '#login-button',
      error: '[data-test="error"]',
    };
  }

  async goto() {
    await this.page.goto(BASE_URL);
  }

  async login(username, password) {
    await this.page.locator(this.selectors.username).fill(username);
    await this.page.locator(this.selectors.password).fill(password);
    await this.page.locator(this.selectors.submit).click();
  }

  get error() {
    return this.page.locator(this.selectors.error);
  }
}

module.exports = LoginPage;
