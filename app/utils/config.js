const { DEFAULT_OSC_HOST, DEFAULT_OSC_PORT } = require('./const');

const defaultConfig = {
	PORT: 38888,
	SHOW_IPV6: false,
	OSC_HOST: DEFAULT_OSC_HOST,
	OSC_PORT: DEFAULT_OSC_PORT,
};

const normalizeKey = (key) => {
	return key.replace(/^--/, '').toUpperCase().replace(/-/g, '_')
}

const normalizeValue = (val) => {
	if (val === 'true') {
		return true;
	}
	if (val === 'false') {
		return false;
	}
	if (+val === +val && String(+val) === val) {
		return val;
	}
	return val;
};

const loadInput = (argv) => {
	const config = {};
	let lastInput = null;

	for (const arg of argv) {
		if (arg.startsWith('--')) {
			if (arg.includes('=')) {
				[keyPart, ...valParts] = arg.split('=');
				config[normalizeKey(keyPart)] = normalizeValue(valParts.join('='));
			} else {
				lastInput = normalizeKey(arg);
				config[lastInput] = true;
			}
		}
		else if (lastInput) {
			config[lastInput] = normalizeValue(arg);
		}
	}

	return config;
};

const getConfig = (() => {
	const argsConfig = loadInput(process.argv.slice(2));
	return (key) => {
		return argsConfig[key] ?? process.env[key] ?? defaultConfig[key];
	}
})();

module.exports = {
	getConfig,
	defaultConfig,
};