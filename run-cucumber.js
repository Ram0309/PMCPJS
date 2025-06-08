const { spawn } = require('child_process');
const path = require('path');

// Get all arguments after "run-cucumber.js"
const args = process.argv.slice(2);

// Extract --browser and --headed, set env vars, and remove them from args
let browser, headed;
const filteredArgs = [];
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--browser' && args[i + 1]) {
    browser = args[i + 1];
    i++;
  } else if (args[i] === '--headed') {
    headed = 'true';
  } else {
    filteredArgs.push(args[i]);
  }
}

// Always add the JSON formatter for the report
if (!filteredArgs.some(arg => arg.startsWith('--format'))) {
  filteredArgs.push('--format', 'json:cucumber-report.json');
}

if (browser) process.env.BROWSER = browser;
if (headed) process.env.HEADED = headed;

// Use the local cucumber-js binary
const cucumberPath = path.join(
  __dirname,
  'node_modules',
  '.bin',
  process.platform === 'win32' ? 'cucumber-js.cmd' : 'cucumber-js'
);

const child = spawn(cucumberPath, filteredArgs, { stdio: 'inherit', env: process.env });

child.on('exit', code => process.exit(code));