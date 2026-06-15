import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  testDir: './tests',
  timeout: 600000,
  retries: 1,
  
  // 1. GLOBAL USE: Removed storageState from here!
  use: {
    baseURL: process.env.BASE_URL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },

  projects: [
    // 2. SETUP PROJECT: Runs without trying to load a state
    { 
      name: 'setup', 
      testMatch: /.*\.setup\.ts/ 
    },
    
    // 3. MAIN TESTS: Depends on setup, uses the state
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        storageState: '.auth/login-state.json', // <-- MOVED HERE
      },
      dependencies: ['setup'],
    },
  ],
});