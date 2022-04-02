const client = require("../client");
const bcrypt = require("bcrypt");

const getAllUsers = async () => {
  try {
    const { rows: users } = await client.query(`
      SELECT * FROM users;
    `)

    return users;
  } catch(error) {
    throw error;
  }
}

const createUser = async ({ full_name, email, username, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    if (!username || !password) {
      throw {
        name: "MissingFields",
        message: "Please provide a username and a password",
      };
    }

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
};

const getUser = async ({ username, password }) => {
  try {
    const user = await getUserByUsername(username);

    if (!user) {
      throw {
        name: "UserNotFound",
        message: "User not found!",
      };
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
      throw {
        name: "PasswordDoesNotMatch",
        message: "Password is incorrect!",
      };
    }

    if (passwordsMatch) {
      delete user.password;
      return user;
    }
  } catch (error) {
    throw error;
  }
};

const getUserById = async (userId) => {
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
};

const getUserByUsername = async (username) => {
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
};

const updateUser = async ({ id, ...userFields }) => {
  const setString = Object.keys(userFields)
    .map((key, index) => `"${key}" = $${index + 1}`)
    .join(", ");

  if (setString.length === 0) {
    return;
  }

  const { password } = userFields;

  try {
    if (password) {
      const hashPwd = await bcrypt.hash(userFields.password, 10);
      userFields.password = hashPwd;
    }

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
};

const getAdminUser = async (userId) => {
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
};

const updateAdminUser = async (userId) => {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
          UPDATE users
          SET "isAdmin" = true
          WHERE id = $1
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
  getAllUsers
};