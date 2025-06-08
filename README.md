# PlaywrightMCP Enterprise Test Automation Framework

## Overview
A modern, enterprise-grade test automation framework supporting:
- **UI Testing** with Playwright + Cucumber (BDD)
- **API Testing** with Axios (GET, POST, PUT, PATCH, DELETE, schema validation, deep comparison, etc.)
- **Database Testing** with MySQL
- **Data-driven Testing** (Excel, CSV, JSON)
- **Parallel & Cross-browser Execution** (Chromium, Firefox, Webkit, device emulation)
- **Allure Reporting**
- **Logging, Error Handling, Screenshots**
- **Bitbucket CI/CD Integration**
- **Custom execution by feature, tag, or test file**
- **Advanced API assertions and schema validation**

---

## 1. Prerequisites
- Node.js v18 or higher
- npm v8 or higher
- (Optional) MySQL server for DB tests
- (Optional) Bitbucket account for CI/CD

---

## 2. Installation

Clone the repository and install dependencies:

```powershell
# Clone your repo
cd path/to/your/workspace
npm ci
# Install Playwright browsers
npx playwright install --with-deps
```

---

## 3. Project Structure

```
PlaywrightMCP/
├── features/                # Cucumber feature files (UI BDD)
├── pages/                   # Page Object Model classes
├── step-definitions/        # Step definitions, hooks, world
├── tests/                   # API and DB test scripts
├── utils/                   # Utilities: logger, data, API, DB, Excel, config
├── reports/                 # Cucumber/Allure reports (generated)
├── screenshots/             # Failure screenshots (generated)
├── allure-results/          # Allure raw results (generated)
├── allure-report/           # Allure HTML report (generated)
├── .env                     # Environment variables
├── bitbucket-pipelines.yml  # Bitbucket CI/CD pipeline
├── cucumber.json            # Cucumber config
├── package.json             # NPM scripts and dependencies
```

---

## 4. Configuration

- **.env**: Set environment variables for DB, API, base URL, etc.
- **cucumber.json**: Cucumber options, reporting, step definition paths.
- **bitbucket-pipelines.yml**: CI/CD pipeline for Bitbucket (parallel, custom execution).

---

## 5. Running Tests Locally

### UI Tests (All features)
```powershell
npm run test:ui
```

### UI Tests (Specific feature)
```powershell
$env:FEATURE_PATH="features/registration.feature"; npm run test:ui
```

### UI Tests (By tag)
```powershell
$env:CUCUMBER_TAGS="@smoke"; npm run test:ui
```

### Cross-browser/Device
```powershell
$env:BROWSER="firefox"; npm run test:ui
$env:DEVICE="iPhone 12"; npm run test:ui
```

### API Tests (All)
```powershell
npm run test:api
```

### API Tests (Specific)
```powershell
$env:API_TEST="apiTests.ts"; npm run test:api
```

### DB Tests (All)
```powershell
npm run test:db
```

### DB Tests (Specific)
```powershell
$env:DB_TEST="dbTests.ts"; npm run test:db
```

---

## 6. Data-driven Testing
- Use `utils/dataManager.ts` for JSON/CSV
- Use `utils/excelManager.ts` for Excel
- Use Cucumber data tables in `.feature` files

---

## 7. API Automation Features
- Supports GET, POST, PUT, PATCH, DELETE
- Custom assertions: status code, deep JSON equality, string comparison, contains, schema validation (Ajv)
- Example usage in `utils/apiClient.ts`

---

## 8. CI/CD (Bitbucket Pipelines)
- See `bitbucket-pipelines.yml` for full pipeline
- Supports parallel, tag-based, and custom test execution
- Set pipeline variables: `FEATURE_PATH`, `CUCUMBER_TAGS`, `API_TEST`, `DB_TEST`

---

## 9. Example: Adding a New UI Test
1. Create a `.feature` file in `features/`
2. Add step definitions in `step-definitions/`
3. Add or update page objects in `pages/`
4. Run with `npm run test:ui`

---
