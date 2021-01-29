const errorHandler = (err, req, res, next) => {
	if (res.headersSent) return next(err);
	// res.status(500)
	// res.render('error', { error: err })
	res.status(err.status || 500).json({
    	status: 'error',
    	message: err.message || "Something went wrong"
    });
};

module.exports = errorHandler;