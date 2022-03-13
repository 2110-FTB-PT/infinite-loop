const client = require("../client");
const bcrypt = require("bcrypt");
// createUser({ username, password })
// hash the password before storing it to the database
async function createUser({ full_name, email, username, password }) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const {
      rows: [user],
    } = await client.query(
      `
              INSERT INTO users(full_name, email, username, password)
              VALUES($1, $2, $3, $4)
              ON CONFLICT (username) DO NOTHING
              RETURNING *;
          `,
      [full_name, email, username, hashedPassword]
    );
    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}
// getUser({ username, password })
// verify the password against the hashed password
async function getUser({ username, password }) {
  try {
    const user = await getUserByUsername(username);
    const hashedPassword = user.password;
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);
    if (passwordsMatch) {
      delete user.password;
      return user;
    }

    if (!passwordsMatch) {
      throw {
        name: "PasswordDoesNotMatch",
        message: "Password does not match!",
      };
    }

    if (!user) {
      throw {
        name: "UserNotFound",
        message: "User not found!",
      };
    }
  } catch (error) {
    throw error;
  }
}
// getUserById(id)
// select a user using the user’s ID. Return the user object.
// do NOT return the password
async function getUserById(userId) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
          SELECT * FROM users
          WHERE id = $1;
        `,
      [userId]
    );
    if (user === undefined) {
      return null;
    }
    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}
// getUserByUsername(username)
// select a user using the user’s username. Return the user object.
async function getUserByUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
          SELECT * FROM users
          WHERE username = $1;
        `,
      [username]
    );
    if (user === undefined) {
      return null;
    }
    return user;
  } catch (error) {
    throw error;
  }
}
async function updateUser({ id, ...userFields }) {
  const setString = Object.keys(userFields)
    .map((key, index) => `${key} = $${index + 1}`)
    .join(", ");

  if (setString.length === 0) {
    return;
  }

  try {
    const {
      rows: [user],
    } = await client.query(
      `
            UPDATE users
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
          `,
      Object.values(userFields)
    );

    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}

// getAdminUser(useId)
async function getAdminUser(userId) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
          SELECT * FROM users
          WHERE “isAdmin” = true;
        `,
      [userId]
    );
    if (user === undefined) {
      return null;
    }
    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}
const updateAdminUser = async (userId) => {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
            UPDATE users
            SET “isAdmin” = true
            WHERE id=${userId}
            RETURNING *;
        `,
      [userId]
    );

    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
  updateUser,
  getAdminUser,
  updateAdminUser,
};
