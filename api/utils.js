const { getUserById } = require("../db");

// checks to see if a user is logged in
function requireUser(req, res, next) {
  if (!req.user) {
    next({
      name: "MissingUserError",
      message: "You must be logged in to perform this action",
    });
  }
  next();
}

// checks to see if a user is admin. we have 4 people as admin.
function requireAdmin(req, res, next) {
  const { userId } = req.user.id;
  if (userId !== 1 || userId !== 2 || userId !== 3 || userId !== 4) {
    next({
      name: "NotAdminError",
      message: "You don't have right to perform this action",
    });
  }
  next();
}

// function to check owner of account
async function checkOwner(userId) {
  try {
    const user = await getUserById(userId);
    return user.userId === userId;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  requireUser,
  checkOwner,
  requireAdmin
};
