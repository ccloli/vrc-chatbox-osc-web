const { networkInterfaces } = require('os');
const { getConfig } = require('./config');

const showUrlHelp = ({ port }) => {
	try {
		const nets = networkInterfaces();
		console.log('-'.repeat(60));
		console.log('You can access the server by one of the following URL:');

		const list = [];
		let maxlen = 0;
		for (const interface in nets) {
			for (const item of nets[interface]) {
				const url = `http://${item.family === 'IPv6' ? `[${item.address}]` : item.address}:${port}`;
				maxlen = Math.max(maxlen, url.length);
				list.push({
					...item, url, interface,
				});
			}
		}

		const showIPv6 = getConfig('SHOW_IPV6');
		list.sort((a, b) => (
			(b.family === 'IPv4') - (a.family === 'IPv4')
			|| b.internal - a.internal
			|| a.address.localeCompare(b.address)
		)).forEach((item) => {
			if (showIPv6 || item.family === 'IPv4') {
				console.log(`    ${item.url}${' '.repeat(maxlen - item.url.length + 4)}[${item.interface}]`);
			}
		});

		console.log('If you\'re accessing from other device, make sure the device is in the same network, and choose the one that follows your subnet configuration.')
		console.log('-'.repeat(60));
	} catch (err) { }
};

module.exports = showUrlHelp;