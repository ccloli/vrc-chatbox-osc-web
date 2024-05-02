const { execSync } = require('child_process');
const packageJson = require('../../package.json');

const IS_TERMUX = (() => {
	if (process.platform === 'android') {
		return true;
	}
	if (process.platform !== 'linux') {
		return false;
	}

	try {
		if (execSync('uname -o').toString('utf-8').trim() === 'Android') {
			return true;
		}
	} catch (err) {
		// CANNOT LINK EXECUTABLE?
		if (/(^|:)\/data\/data\/com\.termux\//.test(process.env.PATH)) {
			return true;
		}
	}
	return false;
})();

const VERSION = packageJson.version;

module.exports = {
	IS_TERMUX,
	VERSION,
};