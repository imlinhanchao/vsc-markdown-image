const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'linux.sh');

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Read file failded:', err);
        return;
    }

    const result = data.replace(/\r\n/g, '\n');

    fs.writeFile(filePath, result, 'utf8', (err) => {
        if (err) {
            console.error('Write file failed:', err);
            return;
        }
        console.log('linux.sh: CR LF => LF');
    });
});
