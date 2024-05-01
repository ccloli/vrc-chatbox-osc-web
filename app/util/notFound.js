const notFound = (req, res, next) => {
	res.status(404).json({
		message: 'not found',
		data: null,
		code: 404,
	});
};

module.exports = notFound;