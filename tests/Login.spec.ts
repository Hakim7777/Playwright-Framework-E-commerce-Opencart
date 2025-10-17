/**
 * Test Case: Login with Valid Credentials
 * 
 * Tags: @master @sanity @regression
 * 
 * Steps:
 * 1) Navigate to the application URL
 * 2) Navigate to Login page via Home page
 * 3) Enter valid credentials and log in
 * 4) Verify successful login by checking 'My Account' page presence
 */

import { test, expect } from '@playwright/test';
import { HomePage } from '../Pages/HomePage';
import { LoginPage } from '../Pages/LoginPage';
import { MyAccountPage } from '../Pages/MyAccountPage';
import { RandomDataUtil } from '../utils/randomDataGenerator';
import { TestConfig } from '../test.config';

let config: TestConfig;
let homePage: HomePage;
let loginPage: LoginPage;
let myAccountPage: MyAccountPage;

// This hook runs before each test
// This hook runs before each test
test.beforeEach(async ({ page }) => {
  config = new TestConfig(); // Load config (URL, credentials)
  
  // Navigate to base URL
  await page.goto(config.appUrl, { 
    waitUntil: 'domcontentloaded',
    timeout: 30000 
  });
  
  // Wait for page to be fully loaded
  await page.waitForLoadState('networkidle', { timeout: 15000 });

  // Initialize page objects
  homePage = new HomePage(page);
  loginPage = new LoginPage(page);
  myAccountPage = new MyAccountPage(page);
});

// Optional cleanup after each test
test.afterEach(async ({ page }) => {
  // Page cleanup is handled automatically by Playwright
  await page.waitForTimeout(1000);
});

test('User login test @master @sanity @regression', async ({ page }) => {
    
    // First, create a valid user account by registration
    const testEmail = `test${Date.now()}@example.com`;
    const testPassword = "Test123!";
    
    // Step 1: Register a new user
    await homePage.clickMyAccount();
    await page.waitForTimeout(1000);
    await homePage.clickRegister();
    
    // Fill registration form
    const { RegistrationPage } = await import('../Pages/RegistrationPage');
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
    
    // Step 2: Logout
    await myAccountPage.clickLogout();
    
    // Step 3: Login with the newly created credentials
    await homePage.clickMyAccount();
    await page.waitForTimeout(1000);
    await homePage.clickLogin();
    
    // Verify we're on login page
    await expect(page).toHaveURL(/login/, { timeout: 10000 });
    
    // Enter the valid credentials
    await loginPage.setEmail(testEmail);
    await loginPage.setPassword(testPassword);
    await loginPage.clickLogin();
    
    // Wait for navigation after login
    await page.waitForLoadState('networkidle');
    
    // Verify successful login
    const isLoggedIn = await myAccountPage.isMyAccountPageExists();
    expect(isLoggedIn).toBeTruthy();
    
    // Additional verification: check URL contains account
    expect(page.url()).toMatch(/account/);
})
