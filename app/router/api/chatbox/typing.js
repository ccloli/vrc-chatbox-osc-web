const { init } = require('../../../util/pool');

module.exports = async (req, res) => {
	const {
		host = '127.0.0.1', port = 9000, status = false
	} = Object.assign({}, req.params, req.query);

	const client = init(host, port);
	await client.send('/chatbox/typing', status);

	return res.json({
		code: 200,
		message: 'success',
		data: null,
	});
};