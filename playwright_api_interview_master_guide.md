# 🎯 Playwright & API Automation Master Interview Guide

> A complete, interview-cracking guide for QA Automation Engineers covering Playwright UI automation, Built-in Locators, API Automation, Network Mocking, Complex Scenarios, and Situational Questions.

---

## 📑 Table of Contents
1. **Playwright Architecture & Core Fundamentals**
2. **Built-in User-Facing Locators & Action Methods**
3. **Web-First Assertions (Auto-Waiting)**
4. **API Automation in Playwright (Full CRUD + Headers + Auth)**
5. **Network Mocking & Route Interception (`page.route`)**
6. **Top 10 Complex Real-World Scenarios (Whiteboard Ready)**
7. **Top 20 Interview Questions & Golden Answers**

---

# 🏛️ Part 1: Playwright Architecture & Core Fundamentals

### 1. How does Playwright work under the hood?
* **Old Tools (Selenium):** Uses HTTP JSON Wire Protocol / W3C WebDriver. Every action (e.g. click) sends an individual HTTP request through a standalone browser driver (`chromedriver.exe`) to the browser. This adds latency and leads to timing issues.
* **Playwright:** Connects directly to the browser engines (Chromium, Firefox, WebKit) via a single **bi-directional WebSocket connection** using the **Chrome DevTools Protocol (CDP)**.
* **Why it's faster & more reliable:**
  * Real-time bi-directional events (no HTTP polling).
  * Out-of-process architecture: tests run in Node.js while the browser runs separately, avoiding in-browser sandbox limitations.

---

### 2. The 3 Core Objects: Browser, Context, and Page

```
┌─────────────────────────────────────────────────────────────┐
│ 1. BROWSER (e.g. Chromium, Firefox, WebKit)                 │
│    Single browser process (`chromium.launch()`)             │
└──────────────────────────────┬──────────────────────────────┘
                               │
       ┌───────────────────────┴───────────────────────┐
       ▼                                               ▼
┌──────────────────────────────┐        ┌──────────────────────────────┐
│ 2. BROWSER CONTEXT A         │        │ 2. BROWSER CONTEXT B         │
│    (Like Incognito Window 1) │        │    (Like Incognito Window 2) │
│    Independent Cookies/Cache │        │    Independent Cookies/Cache │
└──────────────┬───────────────┘        └──────────────┬───────────────┘
               │                                       │
        ┌──────┴──────┐                         ┌──────┴──────┐
        ▼             ▼                         ▼             ▼
  ┌──────────┐  ┌──────────┐              ┌──────────┐  ┌──────────┐
  │ 3. PAGE  │  │ 3. PAGE  │              │ 3. PAGE  │  │ 3. PAGE  │
  │  (Tab 1) │  │  (Tab 2) │              │  (Tab 1) │  │  (Tab 2) │
  └──────────┘  └──────────┘              └──────────┘  └──────────┘
```

* **`Browser`:** The browser instance (heavy to start). Initialized once per worker.
* **`BrowserContext`:** An isolated incognito session. Super lightweight (takes ~5 milliseconds to start). Has its own cookies, local storage, and cache.
* **`Page`:** A single tab inside a BrowserContext.

> 💡 **Interview Question:** *"How does Playwright achieve multi-user testing in parallel?"*  
> **Answer:** *"By creating multiple `BrowserContexts` inside a single browser instance. Context A can be logged in as an Admin, and Context B can be logged in as a Customer simultaneously without sharing cookies or session storage."*

---

# 🔍 Part 2: Built-in User-Facing Locators & Action Methods

Playwright recommends **User-Facing Locators** over raw CSS or XPath because they reflect how users actually perceive the page and are resilient to UI refactoring.

### The 7 In-Built Locators:

| Locator | Purpose | Live Code Example |
| :--- | :--- | :--- |
| **`getByRole()`** | Buttons, links, checkboxes, headings, dialogs | `page.getByRole('button', { name: 'Submit' })` |
| **`getByText()`** | Locate elements by visible text content | `page.getByText('Order Confirmation')` |
| **`getByLabel()`** | Form inputs associated with `<label>` | `page.getByLabel('Email Address')` |
| **`getByPlaceholder()`** | Inputs with `placeholder="..."` | `page.getByPlaceholder('Enter your password')` |
| **`getByTestId()`** | Custom test attributes (`data-testid`) | `page.getByTestId('cart-badge')` |
| **`getByAltText()`** | Images by `alt` text | `page.getByAltText('Company Logo')` |
| **`getByTitle()`** | Elements with `title` tooltip attribute | `page.getByTitle('Close Dialog')` |

---

### Core Action Methods:

```typescript
// 1. Text Input
await page.getByPlaceholder('Username').fill('standard_user'); // Clears and types instantly
await page.getByPlaceholder('Username').pressSequentially('admin', { delay: 100 }); // Types like a human

// 2. Click & Double Click
await page.getByRole('button', { name: 'Submit' }).click();
await page.getByRole('button', { name: 'Edit' }).dblclick();
await page.getByRole('button', { name: 'Options' }).click({ button: 'right' }); // Right-click

// 3. Checkboxes & Radio Buttons
await page.getByLabel('I agree to terms').check();
await page.getByLabel('Subscribe to newsletter').uncheck();
const isChecked = await page.getByLabel('Male').isChecked();

// 4. Dropdowns (<select>)
await page.locator('#country-select').selectOption('US'); // By value
await page.locator('#country-select').selectOption({ label: 'United States' }); // By visible text

// 5. Keyboard & Shortcuts
await page.keyboard.press('Enter');
await page.keyboard.press('Control+A');

// 6. Hover & Drag-and-Drop
await page.getByText('Account & Lists').hover();
await page.locator('#source-item').dragTo(page.locator('#target-dropzone'));
```

---

# ✅ Part 3: Web-First Assertions (Auto-Waiting)

In older frameworks, you had to write explicit sleeps like `Thread.sleep(5000)`.  
In Playwright, **Web-First Assertions automatically retry** until the expected condition is met or the timeout expires (default: 5 seconds).

```typescript
// 1. Visibility & State
await expect(page.getByRole('alert')).toBeVisible();
await expect(page.locator('#spinner')).toBeHidden();
await expect(page.getByRole('button', { name: 'Submit' })).toBeEnabled();
await expect(page.getByRole('button', { name: 'Save' })).toBeDisabled();

// 2. Text & Values
await expect(page.getByRole('heading')).toHaveText('Welcome back, Yunus!');
await expect(page.getByRole('heading')).toContainText('Welcome');
await expect(page.getByPlaceholder('Email')).toHaveValue('yunus@example.com');

// 3. Page Level
await expect(page).toHaveURL(/.*dashboard/);
await expect(page).toHaveTitle('Swag Labs');

// 4. Counts & Attributes
await expect(page.locator('.cart-item')).toHaveCount(3);
await expect(page.locator('#submit-btn')).toHaveAttribute('type', 'submit');

// 5. Negative Assertions (Also auto-waits!)
await expect(page.getByText('Error')).not.toBeVisible();
```

---

# 🌐 Part 4: API Automation in Playwright

Playwright is **NOT just for UI**! It includes a built-in, lightning-fast HTTP client via the **`request` fixture**. You don't need Axios, Supertest, or Postman!

### 1. Complete CRUD Examples:

```typescript
import { test, expect } from '@playwright/test';

test.describe('API Testing Suite with Playwright', () => {

  const BASE_URL = 'https://reqres.in/api';
  let createdUserId: string;

  // 1. GET Request: Fetch Users
  test('GET - Fetch users list and validate response', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users?page=2`, {
      headers: { 'Accept': 'application/json' }
    });

    // Assert status code
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();

    // Parse JSON body
    const body = await response.json();
    console.log('Total users:', body.total);

    // Assertions on response structure and values
    expect(body.page).toBe(2);
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data.length).toBeGreaterThan(0);
    expect(body.data[0]).toHaveProperty('email');
  });

  // 2. POST Request: Create a User
  test('POST - Create new user with payload', async ({ request }) => {
    const payload = {
      name: 'Yunus Pathan',
      job: 'Senior Automation Engineer'
    };

    const response = await request.post(`${BASE_URL}/users`, {
      data: payload,
      headers: { 'Content-Type': 'application/json' }
    });

    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body.name).toBe('Yunus Pathan');
    expect(body.job).toBe('Senior Automation Engineer');
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('createdAt');

    createdUserId = body.id;
  });

  // 3. PUT Request: Update Existing User
  test('PUT - Update existing user details', async ({ request }) => {
    const updatePayload = {
      name: 'Yunus Pathan',
      job: 'Lead QA Architect'
    };

    const response = await request.put(`${BASE_URL}/users/2`, {
      data: updatePayload
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.job).toBe('Lead QA Architect');
    expect(body).toHaveProperty('updatedAt');
  });

  // 4. DELETE Request: Remove User
  test('DELETE - Delete user account', async ({ request }) => {
    const response = await request.delete(`${BASE_URL}/users/2`);
    expect(response.status()).toBe(204);
  });

});
```

---

### 2. The Power of Hybrid Testing: API Setup ➡️ UI Validation 🚀

> 💡 **Super Famous Interview Question:**  
> *"How do you combine UI and API testing in Playwright to save execution time?"*

**The Strategy:**  
Instead of clicking 15 times through UI forms to create test data (like creating an account or adding 5 items to a cart), we **create the data via API in 100 milliseconds**, then verify the final result in the UI!

```typescript
test('Create user via API and verify on UI dashboard', async ({ request, page }) => {
  // Step 1: Create test order via API (Super fast! 100ms)
  const apiResponse = await request.post('https://api.myapp.com/orders', {
    headers: { 'Authorization': 'Bearer my-token' },
    data: { item: 'Laptop', price: 999 }
  });
  const order = await apiResponse.json();

  // Step 2: Open UI and verify the order is displayed
  await page.goto('/orders');
  await expect(page.getByText(`Order #${order.id}`)).toBeVisible();
});
```

---

# 🚦 Part 5: Network Mocking & Intercepting (`page.route`)

Playwright can intercept any network request before it leaves the browser!

### 1. Mocking an API Response (Stubbing Data)
Useful when the backend is not ready, or to test edge cases without creating real database records:

```typescript
test('Mock API response with custom discount', async ({ page }) => {
  // Intercept call to /api/discount and return fake data
  await page.route('**/api/discount', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ discountPercentage: 50, promoCode: 'FIFTYOFF' })
    });
  });

  await page.goto('/checkout');
  await expect(page.getByText('50% Discount Applied')).toBeVisible();
});
```

### 2. Simulating Server Failures (500 Internal Server Error)
```typescript
test('Verify UI error banner when API crashes', async ({ page }) => {
  await page.route('**/api/payment', async (route) => {
    await route.fulfill({
      status: 500,
      body: 'Internal Server Error'
    });
  });

  await page.goto('/checkout');
  await page.getByRole('button', { name: 'Pay Now' }).click();
  await expect(page.getByText('Payment gateway down. Please try later.')).toBeVisible();
});
```

### 3. Speeding Up Tests by Blocking Images/Fonts/Analytics
```typescript
test('Speed up execution by blocking images', async ({ page }) => {
  await page.route('**/*.{png,jpg,jpeg,svg,gif}', route => route.abort());
  await page.goto('https://ecommerce.com');
});
```

---

# 🧩 Part 6: Top 10 Complex Real-World Scenarios

### Scenario 1: Handling Multiple Tabs / Popups
```typescript
test('Handle opening new tab / window', async ({ page, context }) => {
  await page.goto('https://example.com');

  // Wait for new tab while clicking the link
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page.getByRole('link', { name: 'Open New Window' }).click()
  ]);

  await newPage.waitForLoadState();
  await expect(newPage).toHaveTitle('New Window Title');
  await newPage.getByRole('button', { name: 'Accept' }).click();
  await newPage.close();

  // Return to original page
  await expect(page.getByRole('heading')).toBeVisible();
});
```

---

### Scenario 2: Handling iFrames
```typescript
test('Interact with elements inside an iframe', async ({ page }) => {
  await page.goto('https://example.com/iframe-demo');

  // Locate the iframe using frameLocator()
  const myFrame = page.frameLocator('#payment-iframe');

  // Interact with elements INSIDE the iframe directly!
  await myFrame.getByPlaceholder('Card Number').fill('4111222233334444');
  await myFrame.getByRole('button', { name: 'Submit Payment' }).click();
});
```

---

### Scenario 3: Shadow DOM
> 💡 **Interview Question:** *"How does Playwright handle Shadow DOM elements?"*  
> **Answer:** *"Playwright handles open Shadow DOM **automatically by default**! Unlike Selenium where you had to write JavaScript `shadowRoot`, in Playwright `page.getByRole()` and `page.locator()` pierce through Shadow DOM boundaries transparently."*

```typescript
// Works seamlessly even if inside #shadow-root!
await page.getByRole('button', { name: 'Shadow Button' }).click();
```

---

### Scenario 4: Handling JavaScript Dialogs (Alert, Confirm, Prompt)
Playwright **auto-dismisses** dialogs by default so your test doesn't freeze. To accept or type into one, register a listener:

```typescript
test('Handle alert and confirm popups', async ({ page }) => {
  // Register listener BEFORE clicking the trigger button
  page.on('dialog', async (dialog) => {
    console.log('Dialog message is:', dialog.message());
    expect(dialog.message()).toBe('Are you sure you want to delete?');
    await dialog.accept(); // or dialog.dismiss()
  });

  await page.getByRole('button', { name: 'Delete Item' }).click();
});
```

---

### Scenario 5: File Upload & Download
```typescript
// 1. File Upload (single or multiple)
await page.locator('input[type="file"]').setInputFiles('path/to/resume.pdf');
await page.locator('input[type="file"]').setInputFiles(['doc1.pdf', 'doc2.pdf']); // Multiple

// 2. File Download
const [download] = await Promise.all([
  page.waitForEvent('download'),
  page.getByRole('button', { name: 'Export CSV' }).click()
]);

const downloadPath = await download.path();
console.log('File downloaded to:', downloadPath);
await download.saveAs('./downloads/myReport.csv'); // Save to permanent location
```

---

### Scenario 6: Handling Dynamic / Custom Dropdowns (Bootstrap/React)
When a dropdown is made of `<div>` or `<li>` instead of `<select>`:

```typescript
test('Select item from dynamic search dropdown', async ({ page }) => {
  await page.locator('#search-input').fill('Ind');
  
  // Wait for dropdown menu to appear and click specific item
  const option = page.getByRole('listbox').getByText('India', { exact: true });
  await option.click();
});
```

---

### Scenario 7: Authentication State Reuse (`storageState`)
Never log in via UI 100 times in a test suite!

```typescript
// 1. Save login state once in setup:
test('Global setup: save session', async ({ page }) => {
  await page.goto('/login');
  await page.fill('#user', 'admin');
  await page.fill('#pass', 'secret');
  await page.click('#submit');
  await page.context().storageState({ path: 'auth.json' });
});

// 2. Use saved session in all other tests:
test.use({ storageState: 'auth.json' });

test('User is already logged in', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page.getByText('Welcome, admin')).toBeVisible(); // No login needed!
});
```

---

# 🎤 Part 7: Top 20 Interview Questions & Golden Answers

### Q1: What makes Playwright faster than Selenium?
> *"Playwright runs over a single bi-directional WebSocket connection with the browser via Chrome DevTools Protocol, eliminating HTTP request-response round-trips. It also uses fast, isolated BrowserContexts instead of relaunching entire browser instances."*

### Q2: How does auto-waiting work in Playwright?
> *"Before performing any action (like `click()` or `fill()`), Playwright performs **actionability checks**: it verifies the element is attached to DOM, visible, stable (not animating), enabled, and can receive events. If not ready, it automatically waits up to the configured timeout."*

### Q3: What is the difference between `page.fill()` and `page.pressSequentially()`?
> *" `page.fill()` clears the input and sets the value immediately as a single batch (super fast). `page.pressSequentially()` types character by character with optional keystroke delays, triggering all keyboard events (`keydown`, `keyup`), which is useful for autocomplete search bars."*

### Q4: How do you perform API testing in Playwright?
> *"We use Playwright's built-in `request` fixture (`APIRequestContext`). It provides native HTTP methods (`get`, `post`, `put`, `delete`) with automatic JSON parsing and header management, allowing us to test APIs independently or combine them with UI tests."*

### Q5: What is `page.route()` and why is it useful?
> *" `page.route()` is Playwright's network interception mechanism. It allows us to intercept HTTP requests from the browser to stub/mock API responses, simulate 500 errors, or abort heavy assets like images and fonts to accelerate test runs."*

### Q6: How do you handle iframes in Playwright?
> *"We use `page.frameLocator(iframeSelector)`. It returns a FrameLocator that allows us to find and interact with elements inside the iframe directly using standard locators like `getByRole()` or `locator()`."*

### Q7: How does Playwright handle multiple tabs or popup windows?
> *"We use `context.waitForEvent('page')` wrapped in a `Promise.all()` along with the action triggering the popup. This captures the newly created `Page` object, allowing us to interact with the new tab and switch back to the original page."*

### Q8: What are Web-First Assertions and how do they differ from generic Jest/Chai assertions?
> *"Generic assertions (`expect(val).toBe(true)`) evaluate synchronously once and fail immediately if false. Web-First assertions (`await expect(locator).toBeVisible()`) auto-wait and continuously re-check the condition until it passes or times out, preventing race conditions."*

### Q9: How do you handle file uploads in Playwright?
> *"We use `locator.setInputFiles('filePath')`. If there is no visible file input and the upload is triggered by a button, we listen for the `filechooser` event via `page.waitForEvent('filechooser')`."*

### Q10: How do you handle dynamic tables where row values change?
> *"We use chained locators or `filter()`:  
> `page.locator('tr').filter({ hasText: 'John Doe' }).getByRole('button', { name: 'Delete' }).click()`. This accurately pinpoints the exact button within the matching row."*

### Q11: How do you run tests in parallel in Playwright?
> *"In `playwright.config.ts`, we set `fullyParallel: true` to run tests across multiple worker processes. We can also specify `--workers=4` via the CLI or shard test execution across multiple cloud CI runners using `--shard=1/4`."*

### Q12: How do you skip or run a specific test in Playwright?
> *"To run a specific test, use `test.only()`. To skip, use `test.skip()`. To skip based on condition: `test.skip(browserName === 'firefox')`. To run tests by tag from CLI: `npx playwright test --grep @smoke`."*

### Q13: What is the difference between `locator` and `elementHandle`?
> *"An `ElementHandle` is a direct pointer to an in-memory DOM element from older Puppeteer/Playwright versions and becomes stale when the DOM updates. A `Locator` is a lazy, strict representation that recalculates and auto-waits on every action, eliminating `StaleElementReferenceException`."*

### Q14: What is Strict Mode Violation in Playwright?
> *"By default, Playwright locators are strict. If a locator resolves to more than one element (e.g. 3 buttons match), Playwright throws a `strict mode violation` error to prevent unintended clicks. You resolve it by making the locator specific, or using `.first()`, `.last()`, or `.nth()`."*

### Q15: How do you capture screenshots and videos in Playwright?
> *"In `playwright.config.ts`, configure:  
> `screenshot: 'only-on-failure'`, `video: 'retain-on-failure'`. You can also trigger manual screenshots using `await page.screenshot({ path: 'screenshot.png', fullPage: true })`."*

### Q16: How do you inspect network requests and status codes made by the UI?
> *"We use event listeners: `page.on('request', req => ...)` and `page.on('response', res => ...)`, or `page.waitForResponse(url => url.includes('/api/checkout') && url.status() === 200)`."*

### Q17: Can Playwright test mobile applications?
> *"Playwright tests mobile web applications via device emulation (viewport, user-agent, touch events like Pixel 5 or iPhone 12 in `playwright.config.ts`). It does NOT test native mobile apps (.apk / .ipa); for native mobile, Appium is used."*

### Q18: What is the Playwright Trace Viewer?
> *"The Trace Viewer is a post-mortem debugging GUI. When enabled (`trace: 'on-first-retry'`), it records DOM snapshots before and after every action, console logs, network requests, and visual timeline, allowing you to travel back and forward in time to diagnose failures."*

### Q19: How do you test localized apps with different languages or timezones?
> *"In `playwright.config.ts` or `test.use()`:  
> `locale: 'de-DE'`, `timezoneId: 'Europe/Berlin'`, `geolocation: { longitude: 13.4, latitude: 52.5 }`."*

### Q20: How do you perform visual regression testing in Playwright?
> *"Playwright has built-in pixel-by-pixel visual comparisons:  
> `await expect(page).toHaveScreenshot('landing.png')`. It compares the rendered screenshot against a saved baseline image and highlights pixel mismatches."*
