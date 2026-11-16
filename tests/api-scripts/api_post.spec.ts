import { test, expect } from '@playwright/test';

/**
 * API POST METHOD - Simple Example for Beginners
 * Goal: Create new data on server
 */
test('API POST Request', async ({ request }) => {
  // Step 1: Send POST request with JSON data to create new user
  const response = await request.post('https://reqres.in/api/users', {
    data: {
      name: 'John',
      job: 'Tester'
    }
  });

  // Step 2: Check status code is 201 (Created)
  expect(response.status()).toBe(201);

  // Step 3: Parse response JSON data
  const body = await response.json();

  // Step 4: Verify created data
  expect(body.name).toBe('John');
  expect(body.job).toBe('Tester');
  expect(body).toHaveProperty('id');
});
