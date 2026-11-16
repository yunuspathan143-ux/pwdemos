import { test, expect } from '@playwright/test';

/**
 * Playwright API Automation - All 5 Methods (GET, POST, PUT, PATCH, DELETE)
 * VERY SIMPLE CODE FOR BEGINNERS
 */

test.describe('API Automation All 5 Methods', () => {

  test('1. GET Request (Read Data)', async ({ request }) => {
    // Step 1: Send GET request to fetch user
    const response = await request.get('https://reqres.in/api/users/2');

    // Step 2: Verify status code is 200 (OK)
    expect(response.status()).toBe(200);

    // Step 3: Parse and check JSON response
    const body = await response.json();
    expect(body.data.first_name).toBe('Janet');
  });

  test('2. POST Request (Create Data)', async ({ request }) => {
    // Step 1: Send POST request with JSON payload to create user
    const response = await request.post('https://reqres.in/api/users', {
      data: {
        name: 'John',
        job: 'Tester'
      }
    });

    // Step 2: Verify status code is 201 (Created)
    expect(response.status()).toBe(201);

    // Step 3: Parse and check JSON response
    const body = await response.json();
    expect(body.name).toBe('John');
  });

  test('3. PUT Request (Update Entire Data)', async ({ request }) => {
    // Step 1: Send PUT request to replace user data
    const response = await request.put('https://reqres.in/api/users/2', {
      data: {
        name: 'John Updated',
        job: 'Manager'
      }
    });

    // Step 2: Verify status code is 200 (OK)
    expect(response.status()).toBe(200);

    // Step 3: Parse and check JSON response
    const body = await response.json();
    expect(body.name).toBe('John Updated');
  });

  test('4. PATCH Request (Update Partial Data)', async ({ request }) => {
    // Step 1: Send PATCH request to update only job field
    const response = await request.patch('https://reqres.in/api/users/2', {
      data: {
        job: 'Lead Engineer'
      }
    });

    // Step 2: Verify status code is 200 (OK)
    expect(response.status()).toBe(200);

    // Step 3: Parse and check JSON response
    const body = await response.json();
    expect(body.job).toBe('Lead Engineer');
  });

  test('5. DELETE Request (Remove Data)', async ({ request }) => {
    // Step 1: Send DELETE request to delete user
    const response = await request.delete('https://reqres.in/api/users/2');

    // Step 2: Verify status code is 204 (No Content)
    expect(response.status()).toBe(204);
  });

});
