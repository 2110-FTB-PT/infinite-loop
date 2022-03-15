const { getUserById, getUser } = require("../db");

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

// TODO: checks to see if a user is admin. we have 4 people as admin. Need to confirm the admin's userId's
// function requireAdmin(req, res, next) {
//   const { userId } = req.user.id;
//   if (userId !== 1 || userId !== 2 || userId !== 3 || userId !== 4) {
//     next({
//       name: "NotAdminError",
//       message: "You don't have right to perform this action",
//     });
//   }
//   next();
// }

// function to check owner of account
// const checkOwner = async (userId) => {
//   return async (req, res, next) => {
//     try {
//       const user = await getUserById(userId);
//       console.log('user id: ', id)
//       console.log('user on check owner: ', user)
//       if (user.id !== userId) {
//         console.log('authorization is true')
//         next({
//           name: "InvalidUserError",
//           message: "You are not the owner of this account"
//         })
//       }
//       console.log('true')
//       next();
//     } catch(error) {
//       throw error;
//     }
//   }
// }

async function checkOwner(req, res, next) {
  const { id } = req.user
  const user = await getUserById(id)
  if (user.id !== id) {
    next({
      name: "InvalidUserError",
      message: "You are not the owner of this account"
    })
  }
  next();
}


//TODO: export when requireAdmin is available
module.exports = {
  requireUser,
  checkOwner,
  // requireAdmin
};
