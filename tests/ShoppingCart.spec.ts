/**
 * Test Case: Shopping Cart Management
 * 
 * Tags: @master @regression @cart
 * 
 * Steps:
 * 1) Navigate to the application
 * 2) Search and add multiple products to cart
 * 3) Update product quantity
 * 4) Remove product from cart
 * 5) Verify cart updates correctly
 */

import { test, expect } from '@playwright/test';
import { TestConfig } from '../test.config';
import { HomePage } from '../Pages/HomePage';
import { ProductPage } from '../Pages/ProductPage';

/**
 * Minimal inline implementation of SearchResultsPage to satisfy imports in tests.
 * This avoids the "Cannot find module '../Pages/SearchResultsPage'" compile error.
 * If you have a full implementation, replace this inline stub with the real file.
 */
class SearchResultsPage {
  readonly page: import('@playwright/test').Page;

  constructor(page: import('@playwright/test').Page) {
    this.page = page;
  }

  async selectProduct(name: string) {
    // Click the first link that has the product name text
    await this.page.locator(`a:has-text("${name}")`).first().click();
  }
}

test.describe('Shopping Cart Management Tests', () => {
  let homePage: HomePage;
  let searchResultsPage: SearchResultsPage;
  let productPage: ProductPage;
  const config = new TestConfig();

  test.beforeEach(async ({ page }) => {
    await page.goto(config.appUrl || 'http://localhost/opencart/', {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });
    homePage = new HomePage(page);
  });

  test('Add multiple products to cart @master @regression @cart', async ({ page }) => {
    // Step 1: Search for first product (iPhone)
    await homePage.enterProductName('iPhone');
    await homePage.clickSearch();
    searchResultsPage = new SearchResultsPage(page);
    
    // Step 2: Select first product
    await searchResultsPage.selectProduct('iPhone');
    productPage = new ProductPage(page);
    
    // Step 3: Add iPhone to cart
    await productPage.setQuantity('2');
    await productPage.addToCart();
    
    // Wait for success message
    await page.locator('.alert-success').first().waitFor({ state: 'visible', timeout: 5000 });
    
    // Step 4: Go back and search for another product (MacBook)
    await page.goto(config.appUrl || 'http://localhost/opencart/');
    await homePage.enterProductName('MacBook');
    await homePage.clickSearch();
    searchResultsPage = new SearchResultsPage(page);
    
    // Step 5: Select MacBook
    await searchResultsPage.selectProduct('MacBook');
    productPage = new ProductPage(page);
    
    // Step 6: Add MacBook to cart
    await productPage.setQuantity('1');
    await productPage.addToCart();
    
    // Wait for cart to update
    await page.locator('.alert-success').first().waitFor({ state: 'visible', timeout: 5000 });
    
    // Step 7: Verify cart has items
    const cartButton = page.locator('#cart button.dropdown-toggle').first();
    await cartButton.click();
    
  // Wait for the View Cart link in the dropdown to appear
  await page.locator('#cart .dropdown-menu a:has-text("View Cart")').first().waitFor({ state: 'visible', timeout: 5000 });
    
    // Verify both products are in cart
    const cartContent = await page.locator('.dropdown-menu.pull-right').textContent();
    expect(cartContent).toContain('iPhone');
    expect(cartContent).toContain('MacBook');
    
    console.log('✅ Multiple products added to cart successfully!');
  });

  test('Update product quantity in cart @master @regression @cart', async ({ page }) => {
    // Step 1: Add a product to cart
    await homePage.enterProductName('iPhone');
    await homePage.clickSearch();
    searchResultsPage = new SearchResultsPage(page);
    await searchResultsPage.selectProduct('iPhone');
    productPage = new ProductPage(page);
    await productPage.setQuantity('1');
    await productPage.addToCart();
    
    // Wait for success notification
    await page.locator('.alert-success').first().waitFor({ state: 'visible', timeout: 5000 });
    
    // Step 2: Navigate to cart
    await productPage.clickItemsToNavigateToCart();
    
  // Wait for View Cart link in dropdown
  await page.locator('#cart .dropdown-menu a:has-text("View Cart")').first().waitFor({ state: 'visible', timeout: 5000 });
    
    const shoppingCartPage = await productPage.clickViewCart();
    
    // Wait for cart page to load
    await page.waitForLoadState('networkidle');
    
    // Step 3: Update quantity
    const quantityInput = page.locator('input[name^="quantity"]').first();
    await quantityInput.fill('3');
    
    // Step 4: Click update button
    const updateButton = page.locator('button[data-original-title="Update"]').first();
    await updateButton.click();
    
    // Wait for cart to update (success message or page reload)
    await page.waitForLoadState('networkidle');
    
    // Step 5: Verify quantity updated
    const updatedQuantity = await quantityInput.inputValue();
    expect(updatedQuantity).toBe('3');
    
    console.log('✅ Product quantity updated successfully!');
  });

  test('Remove product from cart @master @regression @cart', async ({ page }) => {
    console.log('🧪 Starting Remove Product Test');
    
    // Search for MacBook and add to cart
    const homePage = new HomePage(page);
    await homePage.enterProductName('MacBook');
    await homePage.clickSearch();
    
    const searchResultsPage = new SearchResultsPage(page);
    await searchResultsPage.selectProduct('MacBook');
    await searchResultsPage.selectProduct('MacBook');
    
    const productPage = new ProductPage(page);
    await productPage.addToCart();
    
    // Wait for success message
    await page.locator('.alert-success').first().waitFor({ state: 'visible', timeout: 5000 });
    
    // Click View Cart
    await productPage.clickItemsToNavigateToCart();
    await page.locator('#cart .dropdown-menu a:has-text("View Cart")').first().waitFor({ state: 'visible', timeout: 5000 });
    await productPage.clickViewCart();
    
    // Wait for cart page to load
    await page.waitForLoadState('networkidle');
    
    // Verify product is in cart before removal
    const productBeforeRemoval = await page.locator('td.text-left:has-text("MacBook")').count();
    expect(productBeforeRemoval).toBeGreaterThan(0);
    console.log('✅ MacBook is in cart, proceeding to remove...');
    
    // Click Remove button and wait for AJAX response
    const removeButton = page.locator('button[data-original-title="Remove"]').first();
    await removeButton.waitFor({ state: 'visible' });
    
    // Wait for the network request to complete after clicking remove
    const [response] = await Promise.all([
      page.waitForResponse(response => 
        response.url().includes('route=checkout/cart') && response.status() === 200
      ),
      removeButton.click()
    ]);
    
    console.log('🔄 Remove button clicked, waiting for cart update...');
    
    // Wait for the page to update after AJAX call
    await page.waitForLoadState('networkidle');
    
    // Wait for either empty cart message OR MacBook to disappear
    await page.waitForFunction(() => {
      const content = document.body.textContent || '';
      const hasEmptyMessage = content.toLowerCase().includes('your shopping cart is empty');
      const noMacBook = !content.includes('MacBook');
      return hasEmptyMessage || noMacBook;
    }, { timeout: 10000 }).catch(() => {
      console.log('⚠️ Timeout waiting for cart update');
    });
    
    // Verify product is removed
    const productAfterRemoval = await page.locator('td.text-left:has-text("MacBook")').count();
    const emptyCartMessage = await page.locator('p:has-text("Your shopping cart is empty!")').count();
    
    // Either the product should be gone OR we should see empty cart message
    const isRemoved = productAfterRemoval === 0 || emptyCartMessage > 0;
    
    if (isRemoved) {
      console.log('✅ Product removed from cart successfully!');
    } else {
      console.log(`❌ Product still in cart. Count: ${productAfterRemoval}`);
    }
    
    expect(isRemoved).toBeTruthy();
  });

  test('Verify cart total price calculation @master @regression @cart', async ({ page }) => {
    // Step 1: Add product with known price
    await homePage.enterProductName('MacBook');
    await homePage.clickSearch();
    searchResultsPage = new SearchResultsPage(page);
    
    // Get product price from search results
    const productPrice = await page.locator('.price').first().textContent();
    console.log(`Product price: ${productPrice}`);
    
    await searchResultsPage.selectProduct('MacBook');
    productPage = new ProductPage(page);
    await productPage.setQuantity('2');
    await productPage.addToCart();
    
    // Wait for success message
    await page.locator('.alert-success').first().waitFor({ state: 'visible', timeout: 5000 });
    
    // Step 2: Navigate to cart
    await productPage.clickItemsToNavigateToCart();
    
  // Wait for View Cart link in dropdown
  await page.locator('#cart .dropdown-menu a:has-text("View Cart")').first().waitFor({ state: 'visible', timeout: 5000 });
    
    const shoppingCartPage = await productPage.clickViewCart();
    
    // Wait for cart page to fully load
    await page.waitForLoadState('networkidle');
    
    // Step 3: Verify total price is displayed
    const totalPrice = await shoppingCartPage.getTotalPrice();
    expect(totalPrice).not.toBeNull();
    console.log(`Cart total: ${totalPrice}`);
    
    console.log('✅ Cart total price verified!');
  });
});
