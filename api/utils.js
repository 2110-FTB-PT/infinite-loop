const requireUser = (req, res, next) => {
  if (!req.user) {
    next({
      name: "MissingUserError",
      message: "You must be logged in to perform this action",
    });
  }
  next();
};

const requireAdmin = (req, res, next) => {
  const isAdmin = req.user.isAdmin;
  if (!isAdmin) {
    next({
      name: "AdminAccessError",
      message: "You don't have the right permission to perform this action",
    });
  }
  next();
};

module.exports = {
  requireUser,
  requireAdmin,
};
