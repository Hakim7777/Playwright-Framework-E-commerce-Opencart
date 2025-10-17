import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import { MyAccountPage } from '../Pages/MyAccountPage';
import { DataProvider } from '../utils/dataProvider';
import { TestConfig } from '../test.config';
import { HomePage } from '../Pages/HomePage';

// Load JSON test data
const jsonPath = "testdata/logindata.json";
const jsonTestData = DataProvider.getTestDataFromJson(jsonPath);

for (const data of jsonTestData) {
  test(`Login Test with JSON Data: ${data.testName} @datadriven`, async ({ page }) => {
    test.setTimeout(60000); // Augmente le timeout à 60s
    const config = new TestConfig();

    // ✅ Utilise baseURL local
    await page.goto(config.appUrl || 'http://localhost/opencart/', {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });

    await page.waitForLoadState('networkidle');
    await expect(page.locator('img[alt="Your Store"]').first()).toBeVisible();

    const homePage = new HomePage(page);
    await homePage.clickMyAccount();
    await homePage.clickLogin();

    const loginPage = new LoginPage(page);
    await loginPage.login(data.email, data.password);

    if (data.expected.toLowerCase() === 'success') {
      const myAccountPage = new MyAccountPage(page);
      const isLoggedIn = await myAccountPage.isMyAccountPageExists();
      expect(isLoggedIn).toBeTruthy();
    } else {
      const errorMessage = await loginPage.getloginErrorMessage();
      // Accept either "No match" or "exceeded login attempts" error messages
      expect(errorMessage).toMatch(/Warning: No match|exceeded allowed number of login attempts/);
    }
  });
}

// Load CSV test data
const csvPath = "testdata/logindata.csv";
const csvTestData = DataProvider.getTestDataFromCsv(csvPath);

for (const data of csvTestData) {
  test(`Login Test with CSV Data: ${data.testName} @datadriven`, async ({ page }) => {
    test.setTimeout(60000);
    const config = new TestConfig();

    await page.goto(config.appUrl || 'http://localhost/opencart/', {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });

    await page.waitForLoadState('networkidle');
    await expect(page.locator('img[alt="Your Store"]').first()).toBeVisible();

    const homePage = new HomePage(page);
    await homePage.clickMyAccount();
    await homePage.clickLogin();

    const loginPage = new LoginPage(page);
    await loginPage.login(data.email, data.password);

    if (data.expected.toLowerCase() === 'success') {
      const myAccountPage = new MyAccountPage(page);
      const isLoggedIn = await myAccountPage.isMyAccountPageExists();
      expect(isLoggedIn).toBeTruthy();
    } else {
      const errorMessage = await loginPage.getloginErrorMessage();
      // Accept either "No match" or "exceeded login attempts" error messages
      expect(errorMessage).toMatch(/Warning: No match|exceeded allowed number of login attempts/);
    }
  });
}
