const fs = require('fs');
const path = require('path');
module.exports = function (dirname, relativePath, endsWith = '') {
    return fs.readdirrSync(path.join(dirname, relativePath)).filter(folder => !folder.startsWith('_') && !folder.startsWith('.DS_STORE') && folder.endsWith(endsWith));
}