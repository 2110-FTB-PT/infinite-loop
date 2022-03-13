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

// function to check owner of account
async function checkOwner(userId, req, res, next) {
  try {
    const user = await getUserById(userId);
    console.log('user: ', user.id)
    if (user.id !== userId) {
      next({
        name: "InvalidUserError",
        message: "You are not the owner of this account"
      })
    }
    next();
  } catch (error) {
    throw error;
  }
}

module.exports = {
  requireUser,
  checkOwner,
};
