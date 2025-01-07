import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";
import { UserModel } from '../models/users.model.js';
import { data } from "../data/data.js";

// Controladores para users
const getAllUsers = async (req, res) => {
  try {
    const users = data.users.map(({ password, ...user }) => user);
    return res.json({
      ok: true,
      users
    });
  } catch (error) {
    console.error("Get all users error:", error);
    return res.status(500).json({
      ok: false,
      msg: 'Server Error',
      error: error.message
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = data.users.find(user => user.id === id);
    if (!user) {
      return res.status(404).json({ ok: false, message: "User not found" });
    }
    const { password: _, ...userWithoutPassword } = user;
    return res.json({
      ok: true,
      user: userWithoutPassword
    });
  } catch (error) {
    console.error("Get user by ID error:", error);
    return res.status(500).json({
      ok: false,
      msg: 'Server Error',
      error: error.message
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, address, preferences, username, role_id, status } = req.body;

    const updatedUser = await UserModel.updateUser(id, {
      name,
      email,
      phone,
      address,
      preferences,
      username,
      role_id,
      status
    });

    if (!updatedUser) {
      return res.status(404).json({
        msg: 'User not found'
      });
    }

    res.status(200).json({
      msg: 'User updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UserModel.findUserById(id);
    if (!user) {
      return res.status(404).json({
        msg: 'User not found'
      });
    }

    await UserModel.removeUser(id);

    res.status(200).json({
      msg: 'User deleted successfully'
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

// Controladores para user_roles
const getAllUserRoles = async (req, res) => {
  try {
    const userRoles = await UserModel.findAllUserRoles();
    res.status(200).json(userRoles);
  } catch (error) {
    console.error("Error fetching user roles:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const getUserRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const userRole = await UserModel.findUserRoleById(id);

    if (!userRole) {
      return res.status(404).json({
        msg: 'User role not found'
      });
    }

    res.status(200).json(userRole);
  } catch (error) {
    console.error("Error fetching user role:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const createUserRole = async (req, res) => {
  try {
    const { role_name } = req.body;

    if (!role_name) {
      return res.status(400).json({
        msg: 'Role name is required'
      });
    }

    const newUserRole = await UserModel.createUserRole({ role_name });

    res.status(201).json({
      msg: 'User role created successfully',
      userRole: newUserRole
    });
  } catch (error) {
    console.error("Error creating user role:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role_name } = req.body;

    const updatedUserRole = await UserModel.updateUserRole(id, { role_name });

    if (!updatedUserRole) {
      return res.status(404).json({
        msg: 'User role not found'
      });
    }

    res.status(200).json({
      msg: 'User role updated successfully',
      userRole: updatedUserRole
    });
  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const deleteUserRole = async (req, res) => {
  try {
    const { id } = req.params;

    const userRole = await UserModel.findUserRoleById(id);
    if (!userRole) {
      return res.status(404).json({
        msg: 'User role not found'
      });
    }

    await UserModel.removeUserRole(id);

    res.status(200).json({
      msg: 'User role deleted successfully'
    });
  } catch (error) {
    console.error("Error deleting user role:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

// Controladores para registro, login, perfil y logout
const register = async (req, res) => {
  try {
    const { name, email, password, phone, address, preferences, username, role_id, status } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ ok: false, message: "Please fill in all required fields." });
    }

    const existingUser = data.users.find(user => user.email === email);
    if (existingUser) return res.status(400).json({ ok: false, message: "Email already exists" });

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = {
      id: (data.users.length + 1).toString(),
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      preferences,
      username,
      role_id,
      status
    };

    data.users.push(newUser);

    const token = jwt.sign(
      { email: newUser.email },
      process.env.SECRET_KEY,
      { expiresIn: '1h' }
    );

    const { password: _, ...userWithoutPassword } = newUser;
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000
    });

    return res.status(201).json({
      ok: true,
      user: userWithoutPassword
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      ok: false,
      msg: 'Server Error',
      error: error.message
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ ok: false, message: "Email and password are required" });
    }

    const user = data.users.find(user => user.email === email);

    if (!user) {
      return res.status(400).json({ ok: false, message: "Email or password is invalid" });
    }

    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ ok: false, message: "Email or password is invalid" });
    }

    const token = jwt.sign(
      { email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: '1h' }
    );

    const { password: _, ...userWithoutPassword } = user;
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000
    });

    return res.json({
      token,
      ok: true,
      user: userWithoutPassword
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      ok: false,
      msg: 'Server Error',
      error: error.message
    });
  }
};

const profile = async (req, res) => {
  try {
    const { email } = req.user;
    const user = data.users.find(user => user.email === email);

    if (!user) {
      return res.status(404).json({ ok: false, message: "User not found" });
    }

    const { password: _, ...userWithoutPassword } = user;
    return res.json({
      ok: true,
      user: userWithoutPassword
    });
  } catch (error) {
    console.error("Profile error:", error);
    return res.status(500).json({
      ok: false,
      msg: 'Server Error',
      error: error.message
    });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production'
    });
    return res.json({
      ok: true,
      message: "Logout successful"
    });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({
      ok: false,
      msg: 'Server Error',
      error: error.message
    });
  }
};

export const UserController = {
  register,
  login,
  profile,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getAllUserRoles,
  getUserRoleById,
  createUserRole,
  updateUserRole,
  deleteUserRole,
  logout
};