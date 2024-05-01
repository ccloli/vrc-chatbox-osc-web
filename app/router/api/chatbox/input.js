const { init } = require('../../../utils/pool');

module.exports = async (req, res) => {
	const {
		host = '127.0.0.1', port = 9000, text, send = true, sfx = true
	} = Object.assign({}, req.query, req.body);

	const client = init(host, port);
	await client.send('/chatbox/input', text, send, sfx);

	return res.json({
		code: 200,
		message: 'success',
		data: null,
	});
};