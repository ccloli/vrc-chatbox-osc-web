const { init } = require('../../../utils/pool');

module.exports = async (req, res) => {
	const {
		host, port, text, send = true, sfx = true
	} = Object.assign({}, req.query, req.body);

	const client = init(host, port);
	await client.send('/chatbox/input', text, send, sfx);

	return res.json({
		code: 200,
		message: 'success',
		data: null,
	});
};