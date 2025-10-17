import { test, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'http://localhost/opencart/';

test.describe('OpenCart - Home page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(BASE_URL);
        await expect(page).toHaveURL(/^(http|https):\/\//); // basic navigation check
    });

    test('should load home page and show site title', async ({ page }) => {
        const title = await page.title();
        expect(title).toBeTruthy();
        expect(title.length).toBeGreaterThan(2);
    });

    test('should display main logo and header elements', async ({ page }) => {
        // logo may be <img alt="Your Store"> or similar
        const logo = page.locator('img[alt="Your Store"]').first();
        await expect(logo).toBeVisible();
    // page.locator('nav') matches multiple <nav> elements on this theme; use first()
    await expect(page.locator('nav').first()).toBeVisible();
    });

    test('should perform a search and show results', async ({ page }) => {
        const searchInput = page.locator('input[name="search"]');
        await searchInput.fill('MacBook');
        await page.click('button.btn-default');
        
        // Wait for search results to load
        await page.waitForLoadState('networkidle');
        await page.locator('text=MacBook').first().waitFor({ state: 'visible', timeout: 5000 });
        
        const resultsExist = await page.locator('text=MacBook').first().count();
        expect(resultsExist).toBeGreaterThan(0);
    });

    test('should navigate to a category via top menu', async ({ page }) => {
        // Hover "Desktops" then click "Mac"
        const desktops = page.locator('a:has-text("Desktops")').first();
        await desktops.hover();
        
        const macLink = page.locator('a:has-text("Mac")').first();
        await macLink.waitFor({ state: 'visible', timeout: 3000 });
        await macLink.click();
        
        // Wait for navigation and page load
        await page.waitForLoadState('networkidle');
        
        const heading = page.locator('h2, h1').first();
        await expect(heading).toBeVisible();
    });

    test('cart shows empty state on fresh visit', async ({ page }) => {
        // open cart dropdown
        const cartButton = page.locator('#cart button').first();
        await cartButton.click();
        
        // Wait for dropdown to appear
        const emptyMsg = page.locator('text=Your shopping cart is empty!').first();
        await emptyMsg.waitFor({ state: 'visible', timeout: 3000 });
        await expect(emptyMsg).toBeVisible();
    });
});
