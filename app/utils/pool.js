const { Client } = require('node-osc');
const { promisify } = require('util');
const { DEFAULT_OSC_HOST, DEFAULT_OSC_PORT } = require('./const');
const { getConfig } = require('./config');

const pool = {};

class OSCClient extends Client {
	constructor(host, port) {
		super(host, port);

		this.closed = false;
		// FIXME: accessing private property?
		this._sock.on('close', () => {
			this.closed = true;
		});
	}

	close(cb) {
		super.close(cb);
		this.closed = true;
	}

	async send(...args) {
		return promisify(super.send.bind(this))(...args).then((res) => {
			if (res instanceof Error) {
				throw res;
			}
		});
	}
}

const init = (host, port) => {
	host = host || getConfig('OSC_HOST');
	port = port || getConfig('OSC_PORT');

	const key = `${host}:${port}`;
	if (pool[key] && !pool[key].closed) {
		return pool[key];
	}

	const client = new OSCClient(host, port);
	pool[key] = client;
	return client;
};

module.exports = {
	OSCClient,
	init,
};