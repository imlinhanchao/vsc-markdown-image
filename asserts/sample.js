const path = require('path');

module.exports = async function(filePath, savePath, markdownPath) {
    // Return a picture access link
    return path.relative(path.dirname(markdownPath), filePath); 
}