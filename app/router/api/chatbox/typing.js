const { init } = require('../../../utils/pool');

module.exports = async (req, res) => {
	const {
		host, port, status = false
	} = Object.assign({}, req.query, req.body);

	const client = init(host, port);
	await client.send('/chatbox/typing', status);

	return res.json({
		code: 200,
		message: 'success',
		data: null,
	});
};