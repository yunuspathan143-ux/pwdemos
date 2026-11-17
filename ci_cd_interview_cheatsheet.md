# 🏆 CI/CD for QA Automation: Complete Interview Revision Guide

> A beginner-friendly, comprehensive cheat-sheet designed specifically for QA Automation Engineers preparing for technical interviews.

---

## 📌 1. Fundamentals in Plain English

### What is CI (Continuous Integration)?
* **Definition:** A development practice where team members integrate their code into a shared repository frequently (multiple times a day). Each integration is verified by an automated build and automated tests.
* **Analogy:** Instead of waiting 3 weeks to assemble a 4-tier wedding cake on the day of the event, all bakers bring their tiers together every evening to verify the fit, taste, and dimensions with an automated robot inspector.
* **Why it matters to QA:** **Fast feedback**. Catch bugs immediately when they are small and easy to fix, rather than days or weeks later.

### What is CD (Continuous Delivery vs. Continuous Deployment)?
* **Continuous Delivery:** Code is automatically tested, packaged, and verified, so it is always ready to be deployed to production with a manual "Go / Release" approval.
* **Continuous Deployment:** Code changes pass all automated quality gates and are automatically released to production without human intervention.

---

## 🧩 2. The 4 Core Moving Parts

| Component | Technical Name | Example in Our Setup | Real-World Role |
| :--- | :--- | :--- | :--- |
| **1. Source Code** | SCM / Git | GitHub (`yunuspathan143-ux/pwdemos`) | Storage where test scripts & application code live |
| **2. Trigger** | Webhook / Event | Push, Pull Request, `schedule` (cron) | The spark that starts the pipeline automatically |
| **3. Runner** | Agent / Machine | `ubuntu-latest` Virtual Machine | The temporary cloud computer executing commands |
| **4. Pipeline** | Workflow / Job | `.github/workflows/playwright.yml` | The step-by-step recipe instructions |
| **5. Output** | Artifacts | `playwright-report/` zip | Failure screenshots, videos, and HTML reports saved before machine shutdown |

---

## 🔬 3. Playwright GitHub Actions Workflow Breakdown

```yaml
name: Playwright Tests

on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]
  workflow_dispatch: # Manual button trigger
  schedule:
    - cron: '0 2 * * *' # Nightly at 2:00 AM UTC

jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    steps:
    - name: 1. Checkout code
      uses: actions/checkout@v4

    - name: 2. Set up Node.js
      uses: actions/setup-node@v4
      with:
        node-version: lts/*
        cache: 'npm'

    - name: 3. Install dependencies
      run: npm ci

    - name: 4. Install Playwright Browsers with OS dependencies
      run: npx playwright install --with-deps

    - name: 5. Run Playwright tests
      run: npx playwright test --grep @smoke

    - name: 6. Upload HTML Test Report as an Artifact
      uses: actions/upload-artifact@v4
      if: ${{ !cancelled() }} # Critical: ensures report is uploaded even on failure
      with:
        name: playwright-report
        path: playwright-report/
        retention-days: 30
```

---

## 🎯 4. QA Strategy in CI/CD

### Smoke vs. Regression
* **Smoke Suite (`@smoke`):** 
  * Trigger: On every Pull Request / Push.
  * Duration: 2–5 minutes.
  * Scope: 10–20 high-priority critical business paths (e.g., Login, Search, Checkout).
  * Command: `npx playwright test --grep @smoke`
* **Regression Suite:**
  * Trigger: Scheduled **Nightly** (e.g., 2:00 AM) or pre-release.
  * Duration: 30–60 minutes.
  * Scope: Full test suite across all supported browsers (Chromium, Firefox, WebKit).
  * Command: `npx playwright test`

---

## 🎤 5. Top 10 CI/CD Interview Questions & Golden Answers

### Q1: What CI/CD tools have you used, and what was your pipeline structure?
> *"In my recent project, I used **GitHub Actions** for our Playwright automation pipeline. Our workflow is defined in YAML and runs on an `ubuntu-latest` runner. The pipeline checks out the repository, sets up Node.js with caching, installs dependencies using `npm ci`, downloads Playwright browsers with `--with-deps`, runs targeted tests, and uploads the HTML test report and trace artifacts."*

### Q2: What is the difference between `npm install` and `npm ci` in CI?
> *"In CI, we strictly use `npm ci` (Clean Install). `npm install` can update `package-lock.json` and resolve newer compatible versions, creating inconsistencies across machines. `npm ci` removes `node_modules` and installs exact versions locked in `package-lock.json`, making builds deterministic, faster, and reproducible."*

### Q3: Why do we use `--with-deps` when running `npx playwright install`?
> *"Headless browsers on Linux require operating system-level shared libraries (for graphics, fonts, audio, and networking like GTK and NSS). The `--with-deps` flag automatically installs all required Linux system dependencies along with the browser binaries so they don't crash."*

### Q4: If tests fail, the pipeline normally exits immediately. How do you ensure the test report is uploaded?
> *"By configuring conditional execution on the artifact upload step: `if: ${{ !cancelled() }}` or `if: always()`. This instructs GitHub Actions to execute the report upload step even if the preceding test step failed with exit code 1."*

### Q5: How do you protect passwords, API tokens, and credentials in CI/CD?
> *"We never hardcode secrets in source code. We store sensitive credentials in **GitHub Encrypted Secrets** (or environment vaults like HashiCorp Vault / AWS Secrets Manager). In the workflow file, we expose them securely as environment variables using `env: PASSWORD: ${{ secrets.MY_PASSWORD }}` and read them in Playwright via `process.env.PASSWORD`."*

### Q6: What triggers do you configure for your test pipeline?
> *"We use a multi-trigger strategy:
> 1. **Pull Request & Push:** Triggers quick Smoke tests (`@smoke`) to validate developer changes before merging.
> 2. **Schedule (Cron):** Runs full regression suites nightly at 2:00 AM UTC.
> 3. **Manual (`workflow_dispatch`):** Allows QA or release managers to run tests on-demand for specific branches or environments."*

### Q7: What are Flaky Tests, and how do you handle them in CI/CD?
> *"A flaky test is a test that intermittently passes and fails without any code change, usually caused by network latency, timing issues, or dynamic DOM elements. In CI:
> 1. We configure automatic retries (`retries: 2` in CI in `playwright.config.ts`) to avoid blocking pipelines on transient network glitches.
> 2. We use auto-waiting locators and web-first assertions (`expect(locator).toBeVisible()`) rather than hardcoded sleeps.
> 3. We inspect the Playwright Trace Viewer from the CI artifact to analyze timing and DOM state at the exact millisecond of failure."*

### Q8: What is your process when a CI build fails?
> *"My 3-step investigation process:
> 1. **Inspect CI Artifacts:** Download the Playwright HTML report and open the Trace Viewer to see the failure screenshot, video, and action log.
> 2. **Reproduce Locally:** Run the failing test locally with `--ui` or `--headed` against the same environment.
> 3. **Root Cause Analysis:** Determine if it is:
>    - A **real bug** introduced by a developer's change (log defect with trace).
>    - A **script maintenance issue** due to UI locator updates (update test).
>    - An **environment issue** such as staging downtime or network failure (report to DevOps)."*

### Q9: What is the difference between Self-Hosted Runners and GitHub-Hosted Runners?
> *"GitHub-Hosted runners are managed entirely by GitHub in the cloud—they are clean, maintained, and temporary. Self-Hosted runners are dedicated virtual machines or physical servers inside our private company network. We use self-hosted runners when our application under test is behind a private corporate firewall or VPN."*

### Q10: How do you achieve parallel test execution in CI to save time?
> *"In Playwright, we can speed up CI runs in two ways:
> 1. **Local Worker Parallelism:** Increasing `workers` in `playwright.config.ts` to run multiple tests simultaneously on the runner's available CPU cores.
> 2. **Matrix Sharding:** Using GitHub Actions matrix strategy (e.g., `shard: [1/4, 2/4, 3/4, 4/4]`) to run tests across 4 separate cloud machines in parallel, cutting run time by up to 75%."*
