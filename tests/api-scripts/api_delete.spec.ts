import { test, expect } from '@playwright/test';

/**
 * API DELETE METHOD - Simple Example for Beginners
 * Goal: Delete/remove data from server
 */
test('API DELETE Request', async ({ request }) => {
  // Step 1: Send DELETE request to remove user
  const response = await request.delete('https://reqres.in/api/users/2');

  // Step 2: Check status code is 204 (No Content - Successful Delete)
  expect(response.status()).toBe(204);
});
