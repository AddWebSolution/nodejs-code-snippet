const blacklist = new Set();

exports.addToBlacklist = (token) => {
  blacklist.add(token);
};

exports.checkBlacklist = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (blacklist.has(token)) {
    return res.sendError('Token expired!', 401);
  }
  // Token is not blacklisted, continue to the next middleware
  next();
};