/**
 * Test Case: Account Registration
 * 
 * Tags: @master @sanity @regression
 * 
 * Steps:
 * 1) Navigate to application URL 
 * 2) Go to 'My Account' and click 'Register'
 * 3) Fill in registration details with random data
 * 4) Agree to Privacy Policy and submit the form
 * 5) Validate the confirmation message
 */

import { test, expect } from '@playwright/test';
import { HomePage } from '../Pages/HomePage';
import { RegistrationPage } from '../Pages/RegistrationPage';
import { RandomDataUtil } from '../utils/randomDataGenerator';
import { TestConfig } from '../test.config';

let homePage: HomePage;
let registrationPage: RegistrationPage;
let config: TestConfig;

/**
 * Single top-level beforeEach that initializes config, navigates to the app and
 * instantiates page objects assigned to the module-scoped variables.
 */
test.beforeEach(async ({ page }) => {
    config = new TestConfig();

    // Navigate to application URL with proper configuration
    await page.goto(config.appUrl, { 
        waitUntil: 'domcontentloaded',
        timeout: 30000 
    });
    
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle', { timeout: 15000 });
    
    homePage = new HomePage(page);
    registrationPage = new RegistrationPage(page);
});

test.afterEach(async ({ page }) => {
    // Page cleanup is handled automatically by Playwright
    await page.waitForTimeout(1000);
});

test('User registration test @master @sanity @regression', async ({ page }) => {
  const currentTitle = await page.title();
  console.log('Current page title:', currentTitle);
  await expect(page).toHaveTitle(/Your Store|OpenCart|Home/i, { timeout: 10000 });
  
  await homePage.clickMyAccount();
  await page.waitForTimeout(2000);
  await homePage.clickRegister();

  console.log('Filling registration form...');
  await registrationPage.setFirstName(RandomDataUtil.getFirstName());
  await registrationPage.setLastName(RandomDataUtil.getLastName());
  const email = RandomDataUtil.getEmail();
  await registrationPage.setEmail(email);
  await registrationPage.setTelephone(RandomDataUtil.getPhoneNumber());
  const password = RandomDataUtil.getPassword();
  await registrationPage.setPassword(password);
  await registrationPage.setConfirmPassword(password);
  await registrationPage.setPrivacyPolicy();
  await registrationPage.clickContinue();

  const confirmationMsg = await registrationPage.getConfirmationMsg();
  console.log('Confirmation message:', confirmationMsg);
  expect(confirmationMsg).toContain('Your Account Has Been Created!');
});
