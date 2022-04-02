const express = require("express");
const usersRouter = express.Router();
const { requireUser, requireAdmin } = require("./utils.js");
const {
  createUser,
  getUser,
  getUserByUsername,
  updateUser,
  getUserById,
  getAllUsers,
} = require("../db");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { JWT_SECRET } = process.env;

usersRouter.use((req, res, next) => {
  console.log("A request is being made to /users");
  next();
});

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.send(users);
  } catch (error) {
    next({
      name: "NoUsersExist",
      message: "No users have signed up!",
    });
  }
});

usersRouter.get("/userId/:id", async (req, res, next) => {
  const { id } = req.params
  try {
    const user = await getUserById(id)

    res.send(user);
  } catch (error) {
    next({
      name: "UserDoesNotExist",
      message: "This user does not exist",
    });
  }
});

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
    if (user) {
      const token = jwt.sign(user, JWT_SECRET);
      res.send({
        user,
        token,
        message: `Welcome back ${user.username}! `,
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

usersRouter.get("/myaccount", requireUser, async (req, res, next) => {
  try {
    res.send(req.user);
  } catch (error) {
    next(error);
  }
});

usersRouter.patch("/myaccount", requireUser, async (req, res, next) => {
  const { id } = req.user;
  const { ...userValuesToUpdate } = req.body;

  try {
    const updatedUser = await updateUser({ id, ...userValuesToUpdate });
    res.send(updatedUser);
  } catch (error) {
    next({
      name: "FailedToUpdateAccount",
      message: "This account does not exist",
    });
  }
});

usersRouter.patch("/accounts", requireUser, requireAdmin, async (req, res, next) => {
  const { id } = req.body;
  const { ...userValuesToUpdate } = req.body;

  try {
    const user = await getUserById(id)
    if (req.user.isAdmin === true || req.user.id === user.id ) {
    const updatedUser = await updateUser({ id, ...userValuesToUpdate });
    res.send(updatedUser);
    }
  } catch (error) {
    next({
      name: "FailedToUpdateAccount",
      message: "This account does not exist",
    });
  }
});

module.exports = usersRouter;