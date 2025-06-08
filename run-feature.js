const { execSync } = require('child_process');
const path = require('path');

const featureFile = process.argv[2] || 'features/registration.feature';
const browser = process.argv[3] || 'chromium';
const headed = process.argv[4] === 'headed' ? 'false' : 'true';

console.log(`Running: ${featureFile} on ${browser} in ${headed === 'false' ? 'headed' : 'headless'} mode`);

const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const allureResultsDir = path.join(__dirname, 'allure-results');
const allureReportDir = path.join(__dirname, 'allure-report', timestamp);

const env = {
    BROWSER: browser,
    HEADLESS: headed,
    ...process.env,
};

const cmd = `npx cucumber-js "${featureFile}"`;

try {
    execSync(cmd, { stdio: 'inherit', shell: 'cmd.exe', env });
    execSync(`allure generate --clean -o ${allureReportDir} ${allureResultsDir}`, { stdio: 'inherit', shell: 'cmd.exe' });
    console.log(`Allure report generated in: ${allureReportDir}`);
    execSync(`allure open "${allureReportDir}"`, { stdio: 'inherit', shell: 'cmd.exe' }); // Automatically open the report
} catch (err) {
    console.error('Error during test execution or report generation:');
    console.error('Cucumber Error:\n', err.message);
    console.error('Cucumber Stack:\n', err.stack);
    process.exit(1);
}