module.exports = (req, res) => {
	return res.json({
		code: 200,
		message: 'success',
		data: 'pong',
	});
};