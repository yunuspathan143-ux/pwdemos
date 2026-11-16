import { test, expect } from '@playwright/test';

/**
 * API PUT METHOD - Simple Example for Beginners
 * Goal: Completely update existing data on server
 */
test('API PUT Request', async ({ request }) => {
  // Step 1: Send PUT request to update user data completely
  const response = await request.put('https://reqres.in/api/users/2', {
    data: {
      name: 'John Updated',
      job: 'Manager'
    }
  });

  // Step 2: Check status code is 200 (OK)
  expect(response.status()).toBe(200);

  // Step 3: Parse response JSON data
  const body = await response.json();

  // Step 4: Verify updated data
  expect(body.name).toBe('John Updated');
  expect(body.job).toBe('Manager');
});
