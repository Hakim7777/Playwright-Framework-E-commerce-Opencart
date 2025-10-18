/**
 * Test Case: User Logout
 * 
 * Tags: @master @regression
 * 
 * Steps:
 * 1) Navigate to the application URL
 * 2) Go to Login page from Home page
 * 3) Login with valid credentials
 * 4) Verify 'My Account' page
 * 5) Click on Logout link
 * 6) Click on Continue button
 * 7) Verify user is redirected to Home Page
 */

import { test, expect } from '@playwright/test';
import { TestConfig } from '../test.config';
import { HomePage } from '../Pages/HomePage';
import { LoginPage } from '../Pages/LoginPage';
import { MyAccountPage } from '../Pages/MyAccountPage';
import { LogoutPage } from '../Pages/LogoutPage';
import { RegistrationPage } from '../Pages/RegistrationPage';
import { RandomDataUtil } from '../Utils/randomDataGenerator';

// Declare shared variables
let config: TestConfig;
let homePage: HomePage;
let loginPage: LoginPage;
let myAccountPage: MyAccountPage;
let logoutPage: LogoutPage;

// Setup before each test
test.beforeEach(async ({ page }) => {
  config = new TestConfig(); // Load test config
  await page.goto(config.appUrl); // Step 1: Navigate to app URL

  // Initialize page objects
  homePage = new HomePage(page);
  loginPage = new LoginPage(page);
  myAccountPage = new MyAccountPage(page);
  //logoutPage = new LogoutPage(page);
});

// Optional cleanup after each test
test.afterEach(async ({ page }) => {
  await page.close(); // Close the browser tab (helps keep tests clean)
});

test('User logout test @master @regression', async ({ page }) => {
  // First, create a valid user account by registration
  const testEmail = `test${Date.now()}@example.com`;
  const testPassword = "Test123!";
  
  // Step 1: Register a new user
  await homePage.clickMyAccount();
  await page.waitForTimeout(1000);
  await homePage.clickRegister();
  
  const registrationPage = new RegistrationPage(page);
  await registrationPage.setFirstName(RandomDataUtil.getFirstName());
  await registrationPage.setLastName(RandomDataUtil.getLastName());
  await registrationPage.setEmail(testEmail);
  await registrationPage.setTelephone(RandomDataUtil.getPhoneNumber());
  await registrationPage.setPassword(testPassword);
  await registrationPage.setConfirmPassword(testPassword);
  await registrationPage.setPrivacyPolicy();
  await registrationPage.clickContinue();
  
  // Verify registration success
  const confirmationMsg = await registrationPage.getConfirmationMsg();
  expect(confirmationMsg).toContain('Your Account Has Been Created!');
  
  // Step 2: Navigate to My Account dropdown in header
  await page.click('a.dropdown-toggle[title="My Account"]');
  await page.waitForTimeout(500);
  
  // Step 3: Click Logout from dropdown menu
  await page.click('ul.dropdown-menu a:has-text("Logout")');
  await page.waitForTimeout(1000);

  // Step 4: Verify we are on logout page
  logoutPage = new LogoutPage(page);

  // Step 6: Verify "Continue" button is visible before clicking
  expect(await logoutPage.isContinueButtonVisible()).toBe(true);

  // Step 7: Click Continue and verify redirection to HomePage
  homePage = await logoutPage.clickContinue();
  expect(await homePage.isHomePageExists()).toBe(true);
});
