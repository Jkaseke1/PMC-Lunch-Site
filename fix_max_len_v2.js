
// This script aims to address the max-len errors in your JavaScript files.
// It will attempt to split long lines into multiple lines to fit within the maximum allowed length of 80 characters.

const fs = require('fs');
const path = require('path');

// Function to read and update files
const fixMaxLen = (filePath) => {
    let content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    const updatedLines = lines.map(line => {
        if (line.length > 80) {
            // Split the line into multiple lines if it's longer than 80 characters
            const parts = [];
            for (let i = 0; i < line.length; i += 80) {
                parts.push(line.substring(i, i + 80));
            }
            return parts.join('\n'); // Join the parts with new lines
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
