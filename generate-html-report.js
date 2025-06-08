const reporter = require('cucumber-html-reporter');
const fs = require('fs');
const path = require('path');

// Create html-report folder if it doesn't exist
const reportDir = path.join(__dirname, 'html-report');
if (!fs.existsSync(reportDir)) {
  fs.mkdirSync(reportDir);
}

// Get current date and time for filename
const now = new Date();
const dateString = now.toISOString().replace(/[:.]/g, '-');
const featureName = 'registration'; // You can make this dynamic if needed

const outputFile = path.join(
  reportDir,
  `${featureName}_${dateString}.html`
);

reporter.generate({
  theme: 'bootstrap',
  jsonFile: 'cucumber-report.json',
  output: outputFile,
  reportSuiteAsScenarios: true,
  launchReport: false,
  metadata: {
    "Test Environment": "STAGING",
    "Browser": "Chromium",
    "Platform": "Windows",
    "Executed": "Local"
  }
});

console.log(`HTML report generated: ${outputFile}`);