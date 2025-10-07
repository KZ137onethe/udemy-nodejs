const path = require("path");

const specifyPath = (filename, prefixpath = path.join(__dirname, "./")) => {
	return path.join(prefixpath, `./${filename}`);
};

module.exports = {
	specifyPath,
};
