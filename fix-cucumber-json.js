const fs = require('fs');
const path = 'cucumber-report.json';

const data = fs.readFileSync(path, 'utf-8');
let json = JSON.parse(data);

if (!Array.isArray(json)) {
  json = [json];
  fs.writeFileSync(path, JSON.stringify(json, null, 2));
  console.log('Fixed: Wrapped JSON in array.');
} else {
  console.log('No fix needed: JSON already in array format.');
}