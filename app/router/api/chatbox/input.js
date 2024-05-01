const { init } = require('../../../util/pool');

module.exports = async (req, res) => {
	const {
		host = '127.0.0.1', port = 9000, text, send = true, sfx = true
	} = Object.assign({}, req.params, req.query);

	const client = init(host, port);
	await client.send('/chatbox/input', text, send, sfx);

	return res.json({
		code: 200,
		message: 'success',
		data: null,
	});
};