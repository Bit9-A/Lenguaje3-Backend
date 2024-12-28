import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";
import { UserModel} from '../models/users.model.js';

const register = async (req, res) => {
    try {
        const { name, email, password, phone, address, preferences, username, role_id, status } = req.body;
        
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Please fill in all required fields." });
        }

        const existingUser = await UserModel.findByEmail(email);
        if (existingUser) return res.status(400).json({ message: "Email already exists" });

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = await UserModel.create({
            name,
            email,
            password: hashedPassword,
            phone,
            address,
            preferences,
            username,
            role_id,
            status
        });

        const token = jwt.sign(
            { email: newUser.email },
            process.env.SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000 // 1 hour
        });

        const { password: _, ...userWithoutPassword } = newUser;

        return res.status(201).json({
            user: userWithoutPassword
        });
    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({
            msg: 'Server Error',
            error: error.message
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await UserModel.findByEmail(email);

        if (!user || !(await bcryptjs.compare(password, user.password))) {
            return res.status(400).json({ message: "Email or password is invalid" });
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
            maxAge: 3600000 // 1 hour
        });

        return res.json({
            user: userWithoutPassword
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            msg: 'Server Error',
            error: error.message
        });
    }
};

const profile = async (req, res) => {
    try {
        if (!req.user || !req.user.email) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const user = await UserModel.findByEmail(req.user.email);
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const { password, ...userWithoutPassword } = user;

        return res.json({
            user: userWithoutPassword
        });
    } catch (error) {
        console.error("Profile error:", error);
        return res.status(500).json({
            message: 'Server Error',
            error: error.message || 'Unknown error'
        });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.findAll();
        const usersWithoutPasswords = users.map(({ password, ...user }) => user);
        return res.json({
            users: usersWithoutPasswords
        });
    } catch (error) {
        console.error("Get all users error:", error);
        return res.status(500).json({
            msg: 'Server Error',
            error: error.message
        });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await UserModel.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const { password: _, ...userWithoutPassword } = user;

        return res.json({
            user: userWithoutPassword
        });
    } catch (error) {
        console.error("Get user by ID error:", error);
        return res.status(500).json({
            msg: 'Server Error',
            error: error.message
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, address, preferences, username, role_id, status } = req.body;

        const updatedUser = await UserModel.update(id, {
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
            return res.status(404).json({ message: "User not found" });
        }

        const { password: _, ...userWithoutPassword } = updatedUser;

        return res.json({
            user: userWithoutPassword
        });
    } catch (error) {
        console.error("Update user error:", error);
        return res.status(500).json({
            msg: 'Server Error',
            error: error.message
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await UserModel.remove(id);
        return res.json({
            message: "User deleted successfully"
        });
    } catch (error) {
        console.error("Delete user error:", error);
        return res.status(500).json({
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
            message: "Logout successful"
        });
    } catch (error) {
        console.error("Logout error:", error);
        return res.status(500).json({
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
    logout
};