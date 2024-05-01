const errorCatch = (err, req, res, next) => {
	console.error(err);
	res.status(err.status || 500).json({
		message: err.message || 'internal server error',
		data: err,
		code: 500,
	});
};

module.exports = errorCatch;