// authenticate.js
const isAuthenticated = (req, res, next) => {
  // If Passport is available, use its helper (returns true when a user is logged in)
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  // Fallback to a simple session user check
  if (!req.session || !req.session.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  return next();
};

module.exports = { isAuthenticated };