import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer';
import { UserModel } from '../models/users.model.js';

// Controladores para users
const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findUserById(id);
    if (!user) {
      return res.status(404).json({ ok: false, message: "User not found" });
    }
    const { password, ...userWithoutPassword } = user;
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
    const { email, phone, preferences, username, role_id, status, employee_id } = req.body;

    const updatedUser = await UserModel.updateUser(id, {
      email,
      phone,
      preferences,
      username,
      role_id,
      status,
      employee_id
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

export const UserController = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getAllUserRoles,
  getUserRoleById,
  createUserRole,
  updateUserRole,
  deleteUserRole
};