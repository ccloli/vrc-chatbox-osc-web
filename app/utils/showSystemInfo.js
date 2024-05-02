
const { IS_TERMUX, VERSION } = require('./const');

const showSystemInfo = () => {
	const data = {
		version: VERSION,
		node: process.version,
		platform: process.platform,
		arch: process.arch,
	};
	if (data.platform === 'linux' || data.platform === 'android') {
		data.termux = IS_TERMUX;
	}
	console.log(`Runtime info: ${JSON.stringify(data)}`);

	if (IS_TERMUX) {
		console.warn(`You're probably running the server on Android with Termux. If that's the case, make sure you've already installed Termux:API add-on APK, and installed termux-api package. Or the copy to clipboard feature will not work, and may hang the server. See https://wiki.termux.com/wiki/Termux:API for details.`)
	}
};

module.exports = showSystemInfo;