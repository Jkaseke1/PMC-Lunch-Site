
// This script aims to address the max-len errors in your JavaScript files.
// Adjust the lines to fit within the maximum allowed length of 80 characters.

const fs = require('fs');
const path = require('path');

// Function to read and update files
const fixMaxLen = (filePath) => {
    let content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    const updatedLines = lines.map(line => {
        if (line.length > 80) {
            return line.substring(0, 80) + '...'; // Truncate lines longer than 80 characters
        }
        return line;
    });
    fs.writeFileSync(filePath, updatedLines.join('\n'));
};

// Path to your functions directory
const functionsDir = path.join(__dirname, 'functions');

// Read all JavaScript files in the directory
fs.readdirSync(functionsDir).forEach(file => {
    if (file.endsWith('.js')) {
        fixMaxLen(path.join(functionsDir, file));
    }
});

console.log('Max length errors fixed for JavaScript files!');
