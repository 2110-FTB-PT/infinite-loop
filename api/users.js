const express = require("express");
const usersRouter = express.Router();
const { requireUser, checkOwner } = require("./utils.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { JWT_SECRET } = process.env;
const { createUser, getUser, getUserByUsername, updateUser } = require("../db");

usersRouter.use((req, res, next) => {
  console.log("A request is being made to /users");

  next();
});

// POST /users/register
// Create a new user. Require username and password, and
// hash password before saving user to DB.
// Require all passwords to be at least 8 characters long.
usersRouter.post("/register", async (req, res, next) => {
  try {
    const { full_name, email, username, password } = req.body;
    const _user = await getUserByUsername(username);
    if (_user) {
      return next({
        name: "UserExistsError",
        message: "A user by that username already exists",
      });
    }

    if (password.length < 8) {
      return next({
        name: "PasswordLengthError",
        message: "Please enter a password that is a minimum of 8 characters",
      });
    }

    if (!full_name) {
      return next({
        name: "NoNameError",
        message: "Please enter your first and last name",
      });
    }

    if (!email) {
      return next({
        name: "NoEmailError",
        message: "Please enter your email address",
      });
    }

    const newUser = await createUser({ full_name, email, username, password });

    res.send({
      user: newUser,
    });
  } catch ({ name, message }) {
    next({
      name: "InvalidUserNameOrPassword",
      message: "Please do not leave username or password fields blank",
    });
  }
});
// Throw errors for duplicate username, or password-too-short.

// POST /users/login
// Log in the user. Require username and password, and verify that plaintext login password
// matches the saved hashed password before returning a JSON Web Token.
usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  // request must have both
  if (!username || !password) {
    return next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password",
    });
  }

  try {
    const user = await getUser({ username, password });
    console.log("api user", user);
    if (user) {
      // create token & return to user
      const token = jwt.sign(user, JWT_SECRET);
      res.send({
        user: user,
        message: `Welcome back ${user.username}! `,
        token: token,
      });
    } else {
      next({
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// GET /users/me (*)
// Send back the logged-in user's data if a valid token is supplied in the header.
usersRouter.get("/me", requireUser, (req, res, next) => {
  res.send(req.user);
});

//PATCH
usersRouter.patch("/me/:userId", requireUser, async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { full_name, email, username, password } = req.body;
    const authorization = await checkOwner(userId);
    if (!authorization) {
      return next({
        name: "InvalidUserCannotUpdate",
        message: "You are not the owner of this account",
      });
    }
    const updatedUser = await updateUser(
      userId,
      full_name,
      email,
      username,
      password
    );
    res.send(updatedUser);
  } catch (error) {
    next({
      name: "FailedToUpdateRoutine",
      message: "This account does not exist",
    });
  }
});

module.exports = usersRouter;
