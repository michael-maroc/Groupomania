exports.errorHandler = (err, req, res, next) => {
  return res.status(500).json(err.message);
};
