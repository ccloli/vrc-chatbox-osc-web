const errorCatch = fn => (req, res, next) => {
	Promise.resolve(fn(req, res, next)).catch(err => {
		console.error(err);
		res.status(err.status || 500).json({
			message: err.message || 'internal server error',
			data: err,
			code: 500,
		});
	});
};

module.exports = errorCatch;