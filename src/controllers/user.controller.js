import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";
import { data } from "../data/data.js";


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

        //const validPassword = await bcryptjs.compare(password, user.password);
        const validPassword = await password === user.password

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
    logout
};