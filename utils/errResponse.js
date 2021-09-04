exports.retError = (status, message, res) => res.status(status).json({
      status: 'fail',
      message: message,
    });
  