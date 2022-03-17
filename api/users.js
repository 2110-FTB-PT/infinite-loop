const express = require("express");
const usersRouter = express.Router();
const { requireUser } = require("./utils.js");
const { createUser, getUser, getUserByUsername, updateUser, getUserById } = require("../db");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { JWT_SECRET } = process.env;

usersRouter.use((req, res, next) => {
  console.log("A request is being made to /users");
  next();
});

// POST /users/register
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

// POST /users/login
usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
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
usersRouter.get("/myaccount", requireUser, async (req, res, next) => {
  try {
    res.send(req.user);
  } catch (error) {
    next(error)
  }
});

//PATCH /users/me(*)
usersRouter.patch("/myaccount", requireUser, async (req, res, next) => {
  const { id } = req.user;
  const { ...userValuesToUpdate } = req.body

  try {
    const { id: userId } = await getUserById(id)
    console.log('userId: ', userId)
    console.log('id: ', id)
    if (id !== userId) {
      next({
        name: "InvalidUserError",
        message: "You are not the owner of this account"
      })
    }

    const updatedUser = await updateUser({id, ...userValuesToUpdate});
    res.send(updatedUser)
  } catch (error) {
    next({
      name: "FailedToUpdateAccount",
      message: "This account does not exist",
    });
  }
});

module.exports = usersRouter;
