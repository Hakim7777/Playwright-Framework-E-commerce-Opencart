import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 30 * 1000,   //30000 ms(30 secs)
  testDir: './tests',
  fullyParallel: true,
  //retries: process.env.CI ? 2 : 0,
  retries:1,
  //workers: process.env.CI ? 1 : undefined,
  workers: 1,

  reporter: [
    ['html'],
    ['allure-playwright'],
    //['dot'],
    ['list']
  ],

  use: {
    baseURL: 'http://localhost/opencart/',
    trace: 'on',
    screenshot: 'on',
    video: 'on',
    // headless: false, // Commented - now you can choose with --headed or --headless
    viewport: { width: 1280, height: 720 }, // Standard size that works well
    ignoreHTTPSErrors: true, // Ignore SSL errors if necessary
    permissions: ['geolocation'], // Set necessary permissions for geolocation-based tests
  },

  //grep: /@master/,

  projects: [
   {
      name: 'chromium',
      use: { 
        channel: 'chrome'
      },
    },
    {
      name: 'firefox',
      use: { 
        browserName: 'firefox'
      },
    },
    {
      name: 'webkit',
      use: { 
        browserName: 'webkit'
      },
    },
    {
      name: 'msedge',
      use: { 
        channel: 'msedge'
      },
    }
  ],


});
