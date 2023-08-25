const fs = require('fs');
const path = require('path');
module.exports = function (dirname, relativePath) {
    return fs.readdirSync(path.join(dirname, relativePath)).filter(folder => !folder.startsWith('_'));
}