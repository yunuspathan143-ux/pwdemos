import { test, expect } from '@playwright/test';

/**
 * API PATCH METHOD - Simple Example for Beginners
 * Goal: Partially update specific fields on server
 */
test('API PATCH Request', async ({ request }) => {
  // Step 1: Send PATCH request to partially update user data (only job field)
  const response = await request.patch('https://reqres.in/api/users/2', {
    data: {
      job: 'Lead Engineer'
    }
  });

  // Step 2: Check status code is 200 (OK)
  expect(response.status()).toBe(200);

  // Step 3: Parse response JSON data
  const body = await response.json();

  // Step 4: Verify patched field
  expect(body.job).toBe('Lead Engineer');
});
