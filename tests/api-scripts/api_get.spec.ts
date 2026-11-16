import { test, expect } from '@playwright/test';

/**
 * API GET METHOD - Simple Example for Beginners
 * Goal: Read data from server
 */
test('API GET Request', async ({ request }) => {
  // Step 1: Send GET request to server
  const response = await request.get('https://reqres.in/api/users/2');

  // Step 2: Check status code is 200 (OK)
  expect(response.status()).toBe(200);

  // Step 3: Parse response JSON data
  const body = await response.json();

  // Step 4: Verify response data
  expect(body.data.first_name).toBe('Janet');
  expect(body.data.id).toBe(2);
});
